<template>
    <Header />
    <form>            
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <textarea type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Adresse Email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
    </form>
</template>
<script>

import Header from '../components/Header.vue'
export default {
    name: 'new',
    components: {
        Header
    }
}
</script>

<style scoped lang="scss">

</style>