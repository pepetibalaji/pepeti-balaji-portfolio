import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('project details open and restore keyboard focus on desktop and mobile', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const projectTriggers = page.getByRole('button', { name: /^Read about / });
    await expect(projectTriggers).toHaveCount(2);
    for (const trigger of await projectTriggers.all()) {
      await trigger.click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole('heading', { level: 2 })).toBeVisible();
      await expect(dialog.getByRole('button', { name: 'Close project details' })).toBeFocused();
      await expect(dialog.getByRole('link', { name: /Explore the source/ })).toHaveAttribute(
        'href',
        new RegExp('^https://github[.]com/'),
      );
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
      await expect(trigger).toBeFocused();
    }
    // The explicit close control must work as well as the Escape key.
    await projectTriggers.first().click();
    await page.getByRole('button', { name: 'Close project details' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(projectTriggers.first()).toBeFocused();
  }
});

test('expertise tabs support vertical keyboard navigation and associated panels', async ({
  page,
}) => {
  await page.goto('/');
  const tabs = page.getByRole('tablist', { name: 'Expertise areas' }).getByRole('tab');
  await expect(tabs).toHaveCount(4);
  await tabs.first().focus();
  await page.keyboard.press('ArrowDown');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.first()).toHaveAttribute('tabindex', '-1');
  const panel = page.getByRole('tabpanel');
  await expect(panel).toHaveAttribute('aria-labelledby', (await tabs.nth(1).getAttribute('id'))!);
  await expect(panel).toHaveAttribute('id', (await tabs.nth(1).getAttribute('aria-controls'))!);
  await page.keyboard.press('End');
  await expect(tabs.last()).toBeFocused();
  await expect(tabs.last()).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('ArrowDown');
  await expect(tabs.first()).toBeFocused();
  await page.keyboard.press('ArrowUp');
  await expect(tabs.last()).toBeFocused();
  await page.keyboard.press('Home');
  await expect(tabs.first()).toBeFocused();
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Tab');
  await expect(panel).toBeFocused();
});

test('theme choice persists after a reload and can be changed back', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('contact links work and the downloadable resume is a real PDF', async ({ page, request }) => {
  await page.goto('/');
  const contact = page.locator('#contact');
  const mailLinks = contact.locator('a[href^="mailto:"]');
  await expect(mailLinks).toHaveCount(2);
  const emailHref = await mailLinks.first().getAttribute('href');
  expect(emailHref).toMatch(/^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/);
  await expect(mailLinks.last()).toHaveAttribute('href', emailHref!);
  const resume = contact.getByRole('link', { name: 'Download my resume' });
  await expect(resume).toHaveAttribute('download', '');
  const resumeHref = await resume.getAttribute('href');
  expect(resumeHref).toMatch(/\.pdf$/i);
  const response = await request.get(resumeHref!);
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
  const externalLinks = contact.locator('a[target="_blank"]');
  await expect(externalLinks).toHaveCount(2);
  for (const link of await externalLinks.all()) {
    await expect(link).toHaveAttribute('href', new RegExp('^https://'));
    await expect(link).toHaveAttribute('rel', /noreferrer/);
  }
});

test('copy email writes the displayed contact address to the clipboard', async ({
  page,
  context,
  baseURL,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: baseURL! });
  await page.goto('/');
  const mailto = await page.locator('#contact a[href^="mailto:"]').first().getAttribute('href');
  await page.getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.getByRole('button', { name: 'Email copied' })).toBeVisible();
  await expect(page.getByRole('status')).toHaveText(/copied/i);
  const copiedEmail = await page.evaluate(() => navigator.clipboard.readText());
  expect(copiedEmail).toBe(mailto!.slice('mailto:'.length));
});

test('layout fits narrow and wide screens and mobile navigation closes correctly', async ({
  page,
}) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
    }));
    expect(dimensions.content, 'No horizontal scrolling at ' + width + 'px').toBeLessThanOrEqual(
      dimensions.viewport + 1,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  const menuToggle = page.getByRole('button', { name: 'Open menu' });
  await menuToggle.click();
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(nav).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menuToggle).toBeFocused();
  await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(nav).not.toBeVisible();
  await menuToggle.click();
  await nav.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(nav).not.toBeVisible();
});

test('light, project-dialog, and dark states meet automated WCAG A and AA checks', async ({
  page,
}) => {
  test.setTimeout(60_000);
  await page.goto('/');
  const audit = async (state: string) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, state + ' accessibility violations').toEqual([]);
  };
  await audit('Light page');
  await page
    .getByRole('button', { name: /^Read about / })
    .first()
    .click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await audit('Project dialog');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await audit('Dark page');
});
