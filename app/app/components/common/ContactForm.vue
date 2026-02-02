<script setup lang="ts">
interface Props {
  name: string
  email: string
  phone: string
  mobile: string
  message: string
}

defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:name', value: string): void
  (e: 'update:email', value: string): void
  (e: 'update:phone', value: string): void
  (e: 'update:mobile', value: string): void
  (e: 'update:message', value: string): void
  (e: 'submit'): void
}>()

const updateName = (event: Event) => {
  emit('update:name', (event.target as HTMLInputElement).value)
}

const updateEmail = (event: Event) => {
  emit('update:email', (event.target as HTMLInputElement).value)
}

const updatePhone = (event: Event) => {
  emit('update:phone', (event.target as HTMLInputElement).value)
}

const updateMobile = (event: Event) => {
  emit('update:mobile', (event.target as HTMLInputElement).value)
}

const updateMessage = (event: Event) => {
  emit('update:message', (event.target as HTMLTextAreaElement).value)
}

const submitForm = () => {
  emit('submit')
}
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-4 text-black">
    <div>
      <label class="sr-only" for="name">Name</label>
      <input
          :value="name"
          @input="updateName"
          class="w-full rounded-lg border-2 border-gray-200 p-3 text-sm"
          placeholder="Name"
          type="text"
          id="name"
      />
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label class="sr-only" for="email">Email</label>
        <input
            :value="email"
            @input="updateEmail"
            class="w-full rounded-lg border-2 border-gray-200 p-3 text-sm"
            placeholder="Email address"
            type="email"
            id="email"
        />
      </div>

      <div>
        <label class="sr-only" for="phone">Phone</label>
        <input
            :value="phone"
            @input="updatePhone"
            class="w-full rounded-lg border-2 border-gray-200 p-3 text-sm"
            placeholder="Phone Number"
            type="tel"
            id="phone"
        />
      </div>
    </div>

    <div class="form__alt" aria-hidden="true">
      <label for="mobile">Mobil</label>
      <input
          :value="mobile ?? ''"
          @input="updateMobile"
          type="tel"
          name="mobile"
          id="mobile"
          tabindex="-1"
          autocomplete="off"
          data-1p-ignore
          data-lpignore="true"
          data-bwignore
          data-form-type="other"
          data-protonpass-ignore
      />
    </div>

    <div>
      <label class="sr-only" for="message">Message</label>

      <textarea
          :value="message"
          @input="updateMessage"
          class="w-full rounded-lg border-2 border-gray-200 p-3 text-sm"
          placeholder="Message"
          rows="8"
          id="message"
      ></textarea>
    </div>

    <div class="mt-4">
      <button
          type="submit"
          class="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
      >
        Send Inquiry
      </button>
    </div>
  </form>
</template>

<style scoped>
.form__alt {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
