import { test, expect } from '@playwright/test'

test('creates a memecoin and sees it in the list', async ({ page }) => {
  // Se connecter
  await page.goto('/login')
  await page.fill('#password', 'admin123')
  await page.click('button[type="submit"]')

  // Vérifier qu'on est redirigé vers la page des exercices
  await expect(page).toHaveURL('/exercices')

  // Remplir le formulaire de création de memecoin
  const uniqueId = Date.now().toString().slice(-5)
  const memecoinName = `Test Coin ${uniqueId}`
  const memecoinSymbol = `TC${uniqueId.slice(0, 2)}`

  await page.fill('#name', memecoinName)
  await page.fill('#symbol', memecoinSymbol.toUpperCase())
  await page.fill('#description', 'This is a test memecoin created by Playwright')

  // Soumettre le formulaire
  await page.click('button[type="submit"]')

  // Attendre que le message de succès apparaisse
  await expect(page.locator('div.text-success')).toBeVisible()

  // Vérifier que le memecoin apparaît dans la liste
  await expect(page.locator(`text=${memecoinName}`)).toBeVisible()
  await expect(page.locator(`text=${memecoinSymbol.toUpperCase()}`)).toBeVisible()

  // Se déconnecter
  await page.click('text=Déconnexion')

  // Vérifier qu'on est déconnecté (le formulaire de création n'est plus visible)
  await expect(page.locator('text=Connectez-vous pour pouvoir créer')).toBeVisible()
})
