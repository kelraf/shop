Vue.component("loading", {
    props: {
        fullPage: Boolean
    },
    template: `
            <div :class="fullPage ? 'pt-5 mt-5' : '' " class="container-fluid">
                <div :class="fullPage ? 'pt-5 mt-5' : '' " class="row">
                    <div :class="fullPage ? 'pt-5 mt-5' : '' " class="col-6 offset-3 text-center">
                        <img src="../assets/loaders/loader.gif" />
                    </div>
                </div>
            </div>
        `
})