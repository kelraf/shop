Vue.component("select-store-owner", {
    data() {
        return {
            store_owners: [],
            selected: null
        }
    },
    props: {
        storeOwners: Array
    },
    watch: {
        storeOwners: {
            immediate: true,
            handler() {
                if (this.storeOwners !== undefined && this.storeOwners.length) this.store_owners = this.storeOwners
                console.log("store_owners", this.store_owners)
            }
        }
    },
    methods: {
        trigerFilter() {
            this.$emit('filter-it', this.selected)
        }
    },
    filters: {
        store_owner_null: function(store_owner) {

            if (store_owner == null) return "Select Store Owner"
            else return store_owner

        }
    },
    template: `
        <select v-model="selected" @change="trigerFilter">
            <option 
                v-for="(store_owner, index) in this.store_owners" 
                :key="index" 
                :selected='store_owner == null ? true : false' 
                :value='store_owner'
            >{{ store_owner | store_owner_null }}</option>
        </select>
        `
})