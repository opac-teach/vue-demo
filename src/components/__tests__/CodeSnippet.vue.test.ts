import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import CodeSnippet from '@/components/CodeSnippet.vue'
import { setActivePinia, createPinia } from 'pinia'

describe('CodeSnippet', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders name div when name prop is provided', () => {
    const wrapper = mount(CodeSnippet, {
      props: {
        source: 'console.log("test")',
        name: 'Test Name',
      },
    })
    const nameDiv = wrapper.find('div.text-md.italic.text-end')
    expect(nameDiv.exists()).toBe(true)
    expect(nameDiv.text()).toBe('Test Name')
  })

  it('does not render name div when name prop is not provided', () => {
    const wrapper = mount(CodeSnippet, {
      props: {
        source: 'console.log("test")',
      },
    })
    const nameDiv = wrapper.find('div.text-md.italic.text-end')
    expect(nameDiv.exists()).toBe(false)
  })
})
