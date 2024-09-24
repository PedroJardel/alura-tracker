<template>
    <div class="box has-text-weight-bold has-background-primary-light">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BoxTarefa'
})

</script>