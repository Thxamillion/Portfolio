import { test, expect } from '@playwright/test';

test.describe('Navigation and Cross-Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up viewport
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should navigate between main page and chat page', async ({ page }) => {
    // Start at main page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify we're on the main page
    await expect(page.locator('text=👨🏻')).toBeVisible();
    await expect(page.locator('text=Hey there! 👋')).toBeVisible();
    
    // Navigate to chat page by changing URL
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Verify we're on the chat page
    await expect(page.locator('text=👨🏻')).toBeVisible();
    await expect(page.locator('text=Hey there! 👋')).toBeVisible();
    await expect(page.locator('input[placeholder="Ask me anything"]')).toBeVisible();
    
    // Navigate back to main page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify we're back on main page
    await expect(page.locator('text=👨🏻')).toBeVisible();
    
    // Take screenshot of navigation test
    await page.screenshot({ path: 'test-results/navigation-test.png', fullPage: true });
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    // Navigate to main page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigate to chat page
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Use browser back button
    await page.goBack();
    await page.waitForLoadState('networkidle');
    
    // Should be back on main page
    await expect(page.url()).toBe('http://localhost:3001/');
    
    // Use browser forward button
    await page.goForward();
    await page.waitForLoadState('networkidle');
    
    // Should be back on chat page
    await expect(page.url()).toBe('http://localhost:3001/chat');
  });

  test('should handle direct URL access', async ({ page }) => {
    // Direct access to chat page
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Should load chat page properly
    await expect(page.locator('input[placeholder="Ask me anything"]')).toBeVisible();
    await expect(page.locator('button:has-text("Me")')).toBeVisible();
    
    // Direct access to main page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should load main page properly
    await expect(page.locator('text=Hey there! 👋')).toBeVisible();
    await expect(page.locator('button:has-text("Projects")')).toBeVisible();
  });

  test('should handle 404 errors gracefully', async ({ page }) => {
    // Try to access a non-existent page
    const response = await page.goto('/non-existent-page');
    
    // Should return 404 status
    expect(response?.status()).toBe(404);
    
    // Take screenshot of 404 page
    await page.screenshot({ path: 'test-results/404-page.png', fullPage: true });
  });

  test('should maintain state when navigating between pages', async ({ page }) => {
    // Go to main page and trigger Projects view
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await page.locator('button:has-text("Projects")').click();
    await page.waitForTimeout(1000);
    
    // Verify projects are shown
    await expect(page.locator('text=TaskFlow Mobile')).toBeVisible();
    
    // Navigate to chat page
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Navigate back to main page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Main page should be in initial state (not showing projects)
    await expect(page.locator('text=Hey there! 👋')).toBeVisible();
    // Projects should not be visible initially
    await expect(page.locator('text=TaskFlow Mobile')).not.toBeVisible();
  });

  test('should test page performance and loading times', async ({ page }) => {
    // Test main page loading time
    const startTime1 = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime1 = Date.now() - startTime1;
    
    console.log(`Main page load time: ${loadTime1}ms`);
    
    // Test chat page loading time
    const startTime2 = Date.now();
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    const loadTime2 = Date.now() - startTime2;
    
    console.log(`Chat page load time: ${loadTime2}ms`);
    
    // Both pages should load reasonably quickly (under 5 seconds)
    expect(loadTime1).toBeLessThan(5000);
    expect(loadTime2).toBeLessThan(5000);
  });

  test('should test accessibility features', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check if buttons are focusable
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    console.log('Focused element:', focusedElement);
    
    // Navigate to chat and test accessibility there too
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Test if input field is focusable
    await page.locator('input[placeholder="Ask me anything"]').focus();
    const inputFocused = await page.locator('input[placeholder="Ask me anything"]').isFocused();
    expect(inputFocused).toBe(true);
    
    // Take screenshot of accessibility test
    await page.screenshot({ path: 'test-results/accessibility-test.png', fullPage: true });
  });

  test('should test cross-browser compatibility simulation', async ({ page }) => {
    // Test different viewport sizes (simulate different browsers/devices)
    const viewports = [
      { width: 1920, height: 1080 }, // Desktop
      { width: 768, height: 1024 },  // Tablet
      { width: 375, height: 667 }    // Mobile
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      
      // Test main page
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('text=👨🏻')).toBeVisible();
      
      // Test chat page
      await page.goto('/chat');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('input[placeholder="Ask me anything"]')).toBeVisible();
      
      // Take screenshot for each viewport
      await page.screenshot({ 
        path: `test-results/viewport-${viewport.width}x${viewport.height}.png`, 
        fullPage: true 
      });
    }
  });
});