import { test, expect } from '@playwright/test'

test('Créer un memecoin et vérifier son apparition', async ({ page }) => {
  await page.goto('http://localhost:3000/exercices')

  // AUTH
  await page.goto('http://localhost:3000/login')
  await page.fill('input[type="password"]', 'admin123')
  await page.click('button:has-text("Connexion")')

  // CREATE
  await page.goto('http://localhost:3000/exercices')
  await page.fill('#name', 'TestCoin')
  await page.fill('#symbol', 'TST')
  await page.click('button:has-text("Créer le Memecoin")')

  // Vérifie qu’il apparaît dans la liste
  await expect(page.locator('ul')).toContainText('TestCoin')
})
