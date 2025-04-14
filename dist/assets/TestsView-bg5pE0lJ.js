import{S as e}from"./Slot-BFKur4xS.js";import{C as o,a}from"./counter-BHSSEN-2.js";import{_ as n}from"./Examples.vue_vue_type_script_setup_true_lang-D35GzFcB.js";import{d as s,p as c,o as r}from"./index-Co6B8EHA.js";const i=`import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Slot from '@/components/fundamentals/Slot.vue'

describe('Slot', () => {
  it('renders button with green class', () => {
    const wrapper = mount(Slot, {
      props: {
        success: true,
        error: false,
      },
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.classes()).toContain('btn-success')
    expect(button.classes()).not.toContain('btn-error')
  })
  it('renders button with red class', () => {
    const wrapper = mount(Slot, {
      props: {
        success: false,
        error: true,
      },
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.classes()).not.toContain('btn-success')
    expect(button.classes()).toContain('btn-error')
  })
})
`,p=`import { test, expect } from 'vitest'

import { useCount } from '../count.js'

test('useCount', () => {
  const { count, increment } = useCount()
  expect(count.value).toBe(0)

  increment()
  expect(count.value).toBe(1)
})
`,u=`import { describe, beforeEach, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from './counter'

describe('Counter Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('increments', () => {
    const counter = useCounterStore()
    expect(counter.count).toBe(0)
    counter.increment()
    expect(counter.count).toBe(1)
  })
})
`,l=`import { test, expect } from '@playwright/test'

// See here how to get started:
// https://playwright.dev/docs/intro

test.describe('Layout & Routing', () => {
  test('visits the app root url', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header h1')).toHaveText('Vue Demo')
    await expect(page.locator('main h2')).toHaveText('Links to documentation')

    await expect(page.locator('.navbar-center a').first()).toHaveText('Home')
    await expect(page.locator('.navbar-center a').first()).toHaveClass(/(^|\\s)bg-neutral(\\s|$)/)
    await expect(page.locator('.navbar-center a').nth(1)).toHaveText('Fundamentals')
    await expect(page.locator('.navbar-center a').nth(1)).not.toHaveClass(/(^|\\s)bg-neutral(\\s|$)/)

    await expect(page.locator('header')).toHaveCount(1)
    await expect(page.locator('main')).toHaveCount(1)
    await expect(page.locator('footer')).toHaveCount(1)
  })

  test('visits the fundamentals url', async ({ page }) => {
    await page.goto('/fundamentals')
    await expect(page.locator('main h2').first()).toHaveText('Template Syntax')

    await expect(page.locator('.navbar-center a').nth(0)).not.toHaveClass(/(^|\\s)bg-neutral(\\s|$)/)
    await expect(page.locator('.navbar-center a').nth(1)).toHaveClass(/(^|\\s)bg-neutral(\\s|$)/)
  })
})

test.describe('State page', () => {
  test('use the count composable', async ({ page }) => {
    await page.goto('/state')
    await expect(page.locator('h2').first()).toHaveText('Reactivity')

    await expect(page.locator('[data-testid="count-composable-count"]').nth(0)).toHaveText('0')
    await expect(page.locator('[data-testid="count-composable-count"]').nth(1)).toHaveText('0')
    await page.locator('[data-testid="count-composable-increment"]').nth(0).click()
    await expect(page.locator('[data-testid="count-composable-count"]').nth(0)).toHaveText('1')
    await expect(page.locator('[data-testid="count-composable-count"]').nth(1)).toHaveText('0')
    await page.locator('[data-testid="count-composable-increment"]').nth(1).click()
    await expect(page.locator('[data-testid="count-composable-count"]').nth(0)).toHaveText('1')
    await expect(page.locator('[data-testid="count-composable-count"]').nth(1)).toHaveText('1')
  })

  test('use the count store', async ({ page }) => {
    await page.goto('/state')

    await expect(page.locator('[data-testid="count-store-count"]').nth(0)).toHaveText('0')
    await expect(page.locator('[data-testid="count-store-count"]').nth(1)).toHaveText('0')
    await page.locator('[data-testid="count-store-increment"]').nth(0).click()
    await expect(page.locator('[data-testid="count-store-count"]').nth(0)).toHaveText('1')
    await expect(page.locator('[data-testid="count-store-count"]').nth(1)).toHaveText('1')
    await page.locator('[data-testid="count-store-increment"]').nth(1).click()
    await expect(page.locator('[data-testid="count-store-count"]').nth(0)).toHaveText('2')
    await expect(page.locator('[data-testid="count-store-count"]').nth(1)).toHaveText('2')
  })
})
`,h=s({__name:"TestsView",setup(m){const t=[{name:"Slot",description:"Test unitaires, on va verifier qu'un composant isolé fait bien son travail. <br/> On a besoin d'une lib (vue test-utils) pour 'monter' un composant en mémoire et simuler une application",components:[],sources:[e,i],sourcesNames:["Slot","Slot.test"],sourcesLangs:["vue","typescript"]},{name:"Count Composable",description:"On peut tester les composables de manières très simple",components:[],sources:[o,p],sourcesNames:["Count","Count.test"],sourcesLangs:["typescript","typescript"]},{name:"Counter Store",description:"Pour tester les stores, il faut re-creer un store Pinia frais à chaque test",components:[],sources:[a,u],sourcesNames:["Counter","Counter.test"],sourcesLangs:["typescript","typescript"]},{name:"End 2 End Tests",description:"Tests complet via un navigateur sur l'application, on va verifier que tout est bien relié et a le comportement souhaité. ",components:[],sources:[l],sourcesNames:["app.spec.ts"],sourcesLangs:["typescript"]}];return(d,x)=>(r(),c(n,{examples:t}))}});export{h as default};
