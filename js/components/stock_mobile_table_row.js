Vue.component("stock-mobile-table-row", {
    data() {
        return {
            row_data: {
                id: "",
                store_owner: "",
                product: "",
                quantity_available: "",
                sold: "",
                date: "",
                clear_status: ""
            },
            loading_delete: false,
            editing: false,
            sold_edit_only: null,
            edit_loading: true
        }
    },
    props: {
        rowData: Object,
        soldEditOnly: Boolean
    },
    watch: {
        rowData: {
            immediate: true,
            handler() {
                if (this.rowData !== undefined && Object.keys(this.rowData).length) this.row_data = this.rowData
            }
        },
        soldEditOnly: {
            immediate: true,
            handler() {

                this.sold_edit_only = this.soldEditOnly

            }
        }
    },
    template: `

        <tr>
            <td> 
                <span v-if="!editing"> {{ row_data.store_owner }} </span> 
                <input @keyup="update($event)" type="text" v-model="row_data.store_owner" v-if="editing && !sold_edit_only"  />
            </td>
            <td>
                <span v-if="!editing"> {{ row_data.product }} </span>
                <input @keyup="update($event)" type="text" v-model="row_data.product" v-if="editing && !sold_edit_only" />
            </td>
            <td>
                <span v-if="!editing"> {{ row_data.quantity_available }} </span>
                <input @keyup="update($event)" type="text" v-model="row_data.quantity_available" v-if="editing && !sold_edit_only" />
            </td>
            <td>
                <span v-if="!editing"> {{ row_data.sold }} </span>
                <input @keyup="update($event)" type="text" v-model="row_data.sold" v-if="editing"  />
            </td>
            <td>
                <span v-if="!editing"> {{ row_data.date }} </span>
                <input @keyup="update($event)" type="text" v-model="row_data.date" v-if="editing && !sold_edit_only"  />
            </td>
            <td>
                <span v-if="!editing"> {{ row_data.clear_status }} </span>
                <input @keyup="update($event)" type="text" v-model="row_data.clear_status" v-if="editing && !sold_edit_only" />
            </td>
            <td> 
                <button 
                    v-if="!editing"
                    class='btn btn-outline-success btn-sm'
                    @click="openEdit"
                > EDIT </button> </td>

                <button 
                    v-if="editing"
                    class='btn btn-outline-success btn-sm'
                    @click="close"
                > CLOSE </button> </td>
            <td> 
                <button 
                    class='btn btn-outline-danger btn-sm' 
                    @click='deleteIt(row_data.id)'
                > 
                    <img style='width: 20px;' v-if='loading_delete' src="../assets/loaders/loader.gif" /> 
                    <span v-if='!loading_delete'> DELETE </span> 
                </button> 
            </td>
        </tr>
                
    `,
    methods: {
        deleteIt(id) {
            let self = this
            this.loading_delete = true

            $.ajax({
                url: `${config.host}/endpoints/stock_mobile/delete_stock_mobile.php`,
                type: "POST",
                data: JSON.stringify({ id: id }),
                contentType: "application/json; charset=UTF-8",
                success: function(data) {

                    setTimeout(function() {
                        self.$emit("delete-success", self.row_data)
                        self.loading_delete = false
                    }, 2000)

                },
                error: function(request, msg, error) {
                    console.log(request, msg, error)
                }
            })

        },
        openEdit() {
            this.editing = true
        },
        close() {
            this.editing = false
        },
        update(e) {
            if (e.which !== 13) return

            let self = this

            $.ajax({
                url: `${config.host}endpoints/stock_mobile/update.php`,
                type: "POST",
                data: JSON.stringify(self.row_data),
                contentType: "application/json; charset=UTF-8",
                success: function(data) {

                    setTimeout(function() {

                        if (data.bool) {
                            self.editing = false
                        }

                    }, 900)

                },
                error: function(request, msg, error) {
                    console.log(request, msg, error)
                }
            })
        }
    },
    filters: {

    }
})