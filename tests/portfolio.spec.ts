import { test, expect } from '@playwright/test';

test.describe('Portfolio Application Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up viewport
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test.describe('Landing Page (/) Tests', () => {
    test('should load the main landing page properly', async ({ page }) => {
      await page.goto('/');
      
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      
      // Check if page loads without errors
      await expect(page).toHaveTitle(/v0 App/);
      
      // Check for main elements
      await expect(page.locator('text=👨🏻')).toBeVisible();
      await expect(page.locator('text=Hey there! 👋')).toBeVisible();
      await expect(page.locator('text=How\'s it going?')).toBeVisible();
      
      // Take screenshot of landing page
      await page.screenshot({ path: 'test-results/landing-page.png', fullPage: true });
    });

    test('should show and hide quick questions toggle', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check if quick questions are visible by default
      await expect(page.locator('button:has-text("Me")')).toBeVisible();
      await expect(page.locator('button:has-text("Projects")')).toBeVisible();
      await expect(page.locator('button:has-text("Skills")')).toBeVisible();
      await expect(page.locator('button:has-text("Fun")')).toBeVisible();
      await expect(page.locator('button:has-text("Contact")')).toBeVisible();
      
      // Click toggle to hide quick questions
      await page.locator('button:has-text("Hide quick questions")').click();
      
      // Wait for animation
      await page.waitForTimeout(500);
      
      // Quick questions should be hidden
      await expect(page.locator('button:has-text("Me")')).not.toBeVisible();
      
      // Click toggle again to show quick questions
      await page.locator('button:has-text("Hide quick questions")').click();
      await page.waitForTimeout(500);
      
      // Quick questions should be visible again
      await expect(page.locator('button:has-text("Me")')).toBeVisible();
    });

    test('should display projects when Projects button is clicked', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Click Projects button
      await page.locator('button:has-text("Projects")').click();
      
      // Wait for animation to complete
      await page.waitForTimeout(1000);
      
      // Check if greeting disappears
      await expect(page.locator('text=Hey there! 👋')).not.toBeVisible();
      
      // Check if projects are displayed
      await expect(page.locator('text=TaskFlow Mobile')).toBeVisible();
      await expect(page.locator('text=Analytics Dashboard')).toBeVisible();
      await expect(page.locator('text=SoundWave Player')).toBeVisible();
      await expect(page.locator('text=E-Commerce Platform')).toBeVisible();
      await expect(page.locator('text=FitTracker Pro')).toBeVisible();
      
      // Check if project tech tags are visible
      await expect(page.locator('text=React Native')).toBeVisible();
      await expect(page.locator('text=Next.js')).toBeVisible();
      await expect(page.locator('text=Flutter')).toBeVisible();
      
      // Take screenshot of projects view
      await page.screenshot({ path: 'test-results/projects-view.png', fullPage: true });
    });

    test('should display contact information when Contact button is clicked', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Click Contact button
      await page.locator('button:has-text("Contact")').click();
      
      // Wait for animation to complete
      await page.waitForTimeout(1000);
      
      // Check if greeting disappears
      await expect(page.locator('text=Hey there! 👋')).not.toBeVisible();
      
      // Check if contact information is displayed
      await expect(page.locator('text=Contacts')).toBeVisible();
      await expect(page.locator('text=raphaelgiraud12@gmail.com')).toBeVisible();
      await expect(page.locator('text=@Raphael.Giraud')).toBeVisible();
      
      // Check social media buttons
      await expect(page.locator('button:has-text("LinkedIn")')).toBeVisible();
      await expect(page.locator('button:has-text("Youtube")')).toBeVisible();
      await expect(page.locator('button:has-text("Instagram")')).toBeVisible();
      await expect(page.locator('button:has-text("Discord")')).toBeVisible();
      await expect(page.locator('button:has-text("Github")')).toBeVisible();
      await expect(page.locator('button:has-text("X")')).toBeVisible();
      
      // Take screenshot of contact view
      await page.screenshot({ path: 'test-results/contact-view.png', fullPage: true });
    });

    test('should have working email link', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Click Contact button to show contact info
      await page.locator('button:has-text("Contact")').click();
      await page.waitForTimeout(1000);
      
      // Check email link
      const emailLink = page.locator('a[href="mailto:raphaelgiraud12@gmail.com"]').first();
      await expect(emailLink).toBeVisible();
      await expect(emailLink).toHaveAttribute('href', 'mailto:raphaelgiraud12@gmail.com');
    });

    test('should have functional input field', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Find the input field
      const input = page.locator('input[placeholder="Ask me anything"]');
      await expect(input).toBeVisible();
      
      // Type in the input field
      await input.fill('Test message');
      await expect(input).toHaveValue('Test message');
      
      // Clear the input
      await input.clear();
      await expect(input).toHaveValue('');
    });

    test('should have all quick action buttons with correct icons', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check all quick action buttons are present and have correct structure
      const buttons = [
        { text: 'Me', icon: 'User' },
        { text: 'Projects', icon: 'FolderOpen' },
        { text: 'Skills', icon: 'Award' },
        { text: 'Fun', icon: 'Sparkles' },
        { text: 'Contact', icon: 'Mail' }
      ];
      
      for (const button of buttons) {
        const buttonElement = page.locator(`button:has-text("${button.text}")`);
        await expect(buttonElement).toBeVisible();
        
        // Check if button has the expected styling classes
        await expect(buttonElement).toHaveClass(/border-gray-200/);
        await expect(buttonElement).toHaveClass(/rounded-full/);
      }
      
      // Check the more options button (three dots)
      await expect(page.locator('button').filter({ has: page.locator('svg') }).last()).toBeVisible();
    });

    test('should be responsive on mobile viewport', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check main elements are still visible
      await expect(page.locator('text=👨🏻')).toBeVisible();
      await expect(page.locator('text=Hey there! 👋')).toBeVisible();
      
      // Check quick action buttons are still accessible
      await expect(page.locator('button:has-text("Me")')).toBeVisible();
      await expect(page.locator('button:has-text("Projects")')).toBeVisible();
      
      // Test Projects functionality on mobile
      await page.locator('button:has-text("Projects")').click();
      await page.waitForTimeout(1000);
      
      // Check if projects are displayed and scrollable
      await expect(page.locator('text=TaskFlow Mobile')).toBeVisible();
      
      // Take screenshot of mobile view
      await page.screenshot({ path: 'test-results/mobile-view.png', fullPage: true });
    });
  });
});