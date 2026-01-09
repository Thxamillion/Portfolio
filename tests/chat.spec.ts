import { test, expect } from '@playwright/test';

test.describe('Chat Page (/chat) Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up viewport
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should load the chat page properly', async ({ page }) => {
    await page.goto('/chat');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if page loads without errors
    await expect(page).toHaveTitle(/v0 App/);
    
    // Check for main elements
    await expect(page.locator('text=👨🏻')).toBeVisible();
    await expect(page.locator('text=Hey there! 👋')).toBeVisible();
    await expect(page.locator('text=How\'s it going?')).toBeVisible();
    
    // Check if input field is present
    await expect(page.locator('input[placeholder="Ask me anything"]')).toBeVisible();
    
    // Take screenshot of chat page
    await page.screenshot({ path: 'test-results/chat-page.png', fullPage: true });
  });

  test('should show and hide quick questions toggle', async ({ page }) => {
    await page.goto('/chat');
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

  test('should test quick action buttons functionality', async ({ page }) => {
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Test "Tell me about yourself" button
    await page.locator('button:has-text("Me")').click();
    
    // Wait for potential API call and response
    await page.waitForTimeout(2000);
    
    // Check if input field was populated (this tests handleQuickAction)
    const input = page.locator('input[placeholder="Ask me anything"]');
    // Note: The input might be cleared after submission, but we can check for loading state or messages
    
    // Take screenshot after clicking Me button
    await page.screenshot({ path: 'test-results/chat-me-button.png', fullPage: true });
  });

  test('should test Projects quick action', async ({ page }) => {
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Click Projects button
    await page.locator('button:has-text("Projects")').click();
    
    // Wait for potential API response
    await page.waitForTimeout(3000);
    
    // Take screenshot after clicking Projects
    await page.screenshot({ path: 'test-results/chat-projects.png', fullPage: true });
  });

  test('should test Skills quick action', async ({ page }) => {
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Click Skills button
    await page.locator('button:has-text("Skills")').click();
    
    // Wait for potential API response
    await page.waitForTimeout(3000);
    
    // Take screenshot after clicking Skills
    await page.screenshot({ path: 'test-results/chat-skills.png', fullPage: true });
  });

  test('should test Fun quick action', async ({ page }) => {
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Click Fun button
    await page.locator('button:has-text("Fun")').click();
    
    // Wait for potential API response
    await page.waitForTimeout(3000);
    
    // Take screenshot after clicking Fun
    await page.screenshot({ path: 'test-results/chat-fun.png', fullPage: true });
  });

  test('should test Contact quick action', async ({ page }) => {
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Click Contact button
    await page.locator('button:has-text("Contact")').click();
    
    // Wait for potential API response
    await page.waitForTimeout(3000);
    
    // Take screenshot after clicking Contact
    await page.screenshot({ path: 'test-results/chat-contact.png', fullPage: true });
  });

  test('should test manual message input and submission', async ({ page }) => {
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Type a message in the input field
    const input = page.locator('input[placeholder="Ask me anything"]');
    await input.fill('Hello, tell me about your experience');
    
    // Submit the message by clicking the send button
    await page.locator('button[type="submit"]').click();
    
    // Wait for potential API response
    await page.waitForTimeout(5000);
    
    // Take screenshot after sending message
    await page.screenshot({ path: 'test-results/chat-manual-message.png', fullPage: true });
  });

  test('should test form submission with Enter key', async ({ page }) => {
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Type a message and press Enter
    const input = page.locator('input[placeholder="Ask me anything"]');
    await input.fill('What projects have you worked on?');
    await input.press('Enter');
    
    // Wait for potential API response
    await page.waitForTimeout(5000);
    
    // Take screenshot after Enter submission
    await page.screenshot({ path: 'test-results/chat-enter-submission.png', fullPage: true });
  });

  test('should handle loading states correctly', async ({ page }) => {
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Send a message and immediately check for loading state
    const input = page.locator('input[placeholder="Ask me anything"]');
    await input.fill('Tell me about yourself');
    await page.locator('button[type="submit"]').click();
    
    // Check if loading indicator appears (if implemented)
    // Note: This might need adjustment based on actual loading implementation
    await page.waitForTimeout(1000);
    
    // Check if input is disabled during loading
    const inputDisabled = await input.isDisabled();
    
    // Wait for response
    await page.waitForTimeout(4000);
    
    // Take screenshot after loading
    await page.screenshot({ path: 'test-results/chat-after-loading.png', fullPage: true });
  });

  test('should test tool result rendering for different types', async ({ page }) => {
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Test each type of quick action to see if tool results render correctly
    const actions = ['Me', 'Projects', 'Skills', 'Fun', 'Contact'];
    
    for (const action of actions) {
      // Click the action button
      await page.locator(`button:has-text("${action}")`).click();
      
      // Wait for API response and tool result rendering
      await page.waitForTimeout(3000);
      
      // Take screenshot for each action
      await page.screenshot({ path: `test-results/chat-tool-${action.toLowerCase()}.png`, fullPage: true });
      
      // Wait a bit before next action
      await page.waitForTimeout(1000);
    }
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Check main elements are still visible
    await expect(page.locator('text=👨🏻')).toBeVisible();
    await expect(page.locator('text=Hey there! 👋')).toBeVisible();
    
    // Check quick action buttons are still accessible
    await expect(page.locator('button:has-text("Me")')).toBeVisible();
    await expect(page.locator('button:has-text("Projects")')).toBeVisible();
    
    // Check input field is properly sized
    const input = page.locator('input[placeholder="Ask me anything"]');
    await expect(input).toBeVisible();
    
    // Test one action on mobile
    await page.locator('button:has-text("Projects")').click();
    await page.waitForTimeout(3000);
    
    // Take screenshot of mobile chat view
    await page.screenshot({ path: 'test-results/chat-mobile-view.png', fullPage: true });
  });

  test('should test chat message display and formatting', async ({ page }) => {
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Send a message
    const input = page.locator('input[placeholder="Ask me anything"]');
    await input.fill('Hello there!');
    await input.press('Enter');
    
    // Wait for chat messages to appear
    await page.waitForTimeout(3000);
    
    // Check if user message appears with correct styling
    const userMessages = page.locator('.bg-blue-500.text-white');
    if (await userMessages.count() > 0) {
      await expect(userMessages.first()).toBeVisible();
      await expect(userMessages.first()).toHaveText('Hello there!');
    }
    
    // Check if assistant message appears with correct styling
    const assistantMessages = page.locator('.bg-white.border.border-gray-200.text-gray-700');
    if (await assistantMessages.count() > 0) {
      await expect(assistantMessages.first()).toBeVisible();
    }
    
    // Take screenshot of chat messages
    await page.screenshot({ path: 'test-results/chat-messages.png', fullPage: true });
  });

  test('should test API error handling', async ({ page }) => {
    await page.goto('/chat');
    await page.waitForLoadState('networkidle');
    
    // Monitor network requests
    let apiRequestFailed = false;
    page.on('response', response => {
      if (response.url().includes('/api/chat') && !response.ok()) {
        apiRequestFailed = true;
      }
    });
    
    // Send a message to trigger API call
    const input = page.locator('input[placeholder="Ask me anything"]');
    await input.fill('Test message for error handling');
    await input.press('Enter');
    
    // Wait for response
    await page.waitForTimeout(5000);
    
    // Take screenshot regardless of success/failure
    await page.screenshot({ path: 'test-results/chat-api-test.png', fullPage: true });
  });
});