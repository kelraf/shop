Vue.component("stock-mobile-table", {
    data() {
        return {
            loading: true,
            store: [],
            data: [],
            edit_loading: true,
            sold_edit_only: null
        }
    },
    mounted() {
        let self = this

        $.ajax({
            url: `${config.host}endpoints/stock_mobile/get_all.php`,
            type: "GET",
            catch: false,
            success: function(data) {

                setTimeout(function() {
                    self.loading = false

                    if (data.bool) {

                        $(document).ready(function() {
                            $('#table_id').DataTable({
                                dom: "Bfrtip",
                                buttons: [
                                    'print', 'csv', 'excel'
                                ]
                            });
                        });

                        self.store = data.data
                        self.filterIt(null)

                    }
                }, 4000)

            }
        })

    },
    props: {
        soldEditOnly: Boolean
    },
    watch: {
        soldEditOnly: {
            immediate: true,
            handler() {
                this.sold_edit_only = this.soldEditOnly
                console.log("Prop", this.soldEditOnly, "data", this.sold_edit_only)
            }
        }
    },
    computed: {
        store_owners() {

            if (!this.store.length) return []

            let processed_data = this.store.map((item) => {
                return item.store_owner
            })

            processed_data.push(null)

            return [...new Set(processed_data)]

        }
    },
    template: `
        <div>
            <loading :fullPage='true' v-show="loading" />

            <select-store-owner @filter-it='filterIt' :storeOwners='store_owners' v-if="!loading && store.length" class="mt-3 mb-3" />

            <table v-show="!loading && data.length" id="table_id" class="display">
                <thead>
                    <tr>
                        <th> Store owner </th>
                        <th> Product </th>
                        <th> Quantity Available </th>
                        <th> Sold </th>
                        <th> Date </th>
                        <th> Clear Status </th>
                        <th> Action </th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    <stock-mobile-table-row 
                        v-for="(item, index) in data" 
                        :rowData="item" 
                        :key="index" 
                        :soldEditOnly="sold_edit_only"
                        @delete-success="deleteSuccess"
                    />
                </tbody>
            </table>
        </div>
    `,
    methods: {
        filterIt(store_owner) {
            if (store_owner == null) {
                this.data = this.store
            } else {
                this.data = [];
                this.data = this.store.filter((item) => { if (item.store_owner == store_owner) return item })
            }
        },
        deleteSuccess(rowData) {
            this.store = this.store.filter((item) => { if (item.id !== rowData.id) return item })
            this.data = this.data.filter((item) => { if (item.id !== rowData.id) return item })
        }
    }
})