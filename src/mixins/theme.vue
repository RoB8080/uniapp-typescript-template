<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ThemeModule } from '@/store/module/theme'

@Component({
    name: 'Theme'
})
export default class extends Vue {
    private get theme() {
        return ThemeModule.themeStyleString
    }
}
</script>
