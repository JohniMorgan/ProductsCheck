<script setup lang="ts">
import { computed, ref } from 'vue';
import {useTheme} from 'vuetify';

const colors = ref(useTheme().current);

const props = defineProps({
    data: Object,
    labels: Object,
    title: String,
});




const chartData = computed(() => {
    return {
        labels: props.labels,
        datasets: [
            {
                label: props.title,
                data: props.data,
                pointRadius: 5,
                //backgroundColor: colors.value.colors['primary-hover'],
                backgroundColor: '#00BFFF',
                //borderColor: colors.value.colors.primary
                borderColor: '#007BFF'
            }
        ]
    }
});
const chartOptions = computed(() => {
    return {
        responsive: true,
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
        <Bar :data="chartData" :options="chartOptions"/>
    </div>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)
export default {   
    extends: Bar,
}
</script>

<style scoped lang='scss'>
</style>