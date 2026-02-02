<script setup lang="ts">
import { shallowRef } from 'vue'
import { useContactData } from "~/composables/useContactData"
import { useSiteData } from "~/composables/useSiteData"
import { differenceInSeconds } from "date-fns"
import ContactForm from "~/components/common/ContactForm.vue"
import Spinner from "~/components/common/Spinner.vue"
import Success from "~/components/common/Success.vue"

const { site } = useSiteData()
const { contact } = useContactData()

const honeypotThreshold = parseInt(useRuntimeConfig().public.honeypotThreshold, 10)

interface FormData {
  name: string,
  email: string,
  phone: string,
  mobile: string,
  form_time: Date | string,
  message: string,
}

const showSpinner = shallowRef(false)
const showSuccess = shallowRef(false)
const showForm = computed(() => !showSuccess.value && !showSpinner.value)

const getInitialFormData = (): FormData => ({
  name: "",
  email: "",
  phone: "",
  mobile: "",
  form_time: new Date(),
  message: "",
})

const form = ref<FormData>(getInitialFormData())

const resetForm = () => {
  form.value = getInitialFormData()
}

const isFormValid = computed(() => {
  return form.value.name.trim() &&
      (form.value.email.trim() ||
      form.value.phone.trim()) &&
      form.value.message.trim()
})

const submitForm = async () => {
  showSpinner.value = true
  // validate
  if (!isFormValid) {
    showSpinner.value = false
    return
  }
  try{
    const formData = form.value
    const submissionDT = new Date()
    const isOutsideThreshold = differenceInSeconds(submissionDT, formData.form_time) > honeypotThreshold

    if (formData.mobile === '' && isOutsideThreshold) {
      const { mobile, form_time, ...contactForm } = formData
      const response: object = await $fetch('/api/contact-form', {
        method: 'POST',
        body: contactForm,
      })

      if (!response.success) {
        throw new Error('Failed to submit form')
      }
    }
    resetForm()
    showSpinner.value = false
    showSuccess.value = true
  } catch (e) {
    console.log(e)
    showSpinner.value = false
  }
}
const clearSuccess = () => {
  resetForm()
  showSuccess.value=false
}
</script>

<template>
  <section id="contact" class="bg-platinum dark:bg-steel-azure-400 text-black dark:text-platinum-200">
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
        <div class="lg:col-span-2 lg:py-12">

          <h2 class="text-2xl font-extrabold mb-8">{{ contact.title }}</h2>

          <template v-for="description in contact.description">
            <p class="max-w-xl text-lg mb-6">{{ description }}</p>
          </template>

          <div class="mt-8">
            <p class="mt-2 not-italic text-primary font-extrabold">{{ site.builtIn }}!</p>
          </div>
        </div>

        <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">

          <Spinner v-if="showSpinner" />

          <ContactForm
              v-if="showForm"
              v-model:name.trim="form.name"
              v-model:email.trim="form.email"
              v-model:phone.trim="form.phone"
              v-model:mobile.trim="form.mobile"
              v-model:message.trim="form.message"
              @submit="submitForm"
          />

          <Success @updateClearSuccess="clearSuccess"
                   v-if="showSuccess" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
