<template>
    <div />
</template>
<script setup lang="ts">
let adBlockEnabled = false
const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
try {
    await fetch(new Request(googleAdUrl)).catch(_ => adBlockEnabled = true)
} catch (e) {
    adBlockEnabled = true
} finally {
    if (adBlockEnabled) {
        alert(`Alert: Please disable your ad blocker for optimal site experience. Thank you!`)
    }
}
</script>