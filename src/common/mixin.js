import BackTop from "components/content/backTop/BackTop";

export const itemListerMixin = {
    mounted() {
        console.log("混入")
    },
}
export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backclick() {
            this.$refs.scroll.scrollTo(0, 0);
          },
    },
}