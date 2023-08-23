<script setup lang="ts">
import { computed, ref } from 'vue';
import {useTheme} from 'vuetify';
import theme from '../../styles/chart_colorsheet';

const colors = ref(useTheme().current);

const props = defineProps({
    data: Object,
    labels: Object,
    title: String,
    type: String
});

const themeColors = computed(() => {
    return colors.value.dark ? theme.darkColorSheet : theme.lightColorSheet;
});



const chartData = computed(() => {
    return {
        labels: props.labels,
        datasets: [
            {
                data: props.data,
                pointRadius: 5,
                //backgroundColor: colors.value.colors['primary-hover'],
                backgroundColor: themeColors.value.colors[props.type].point,
                //borderColor: colors.value.colors.primary
                borderColor: themeColors.value.colors[props.type].line
            },
        ]
    }
});
const chartOptions = computed(() => {
    return {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: props.title,
            }
        },
        scales: {
            x:{
                grid: {
                    color: colors.value.colors.surface
                },
                border: {
                    display: true,
                    color: colors.value.colors.text,

                },
                title: {
                    display: true,
                    text: "День"
                }
            },
            y: {
                grid: {
                    color: colors.value.colors.surface,
                },
                border: {
                    display: true,
                    color: colors.value.colors.text,

                },
            }
        },
        
    }
});

</script>

<template>
    <div class="theme-bind">
        <Line :data="chartData" :options="chartOptions"/>
    </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)
export default {   
    extends: Line,
}
</script>

<style scoped lang='scss'>
</style>