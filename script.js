let array = [];
let arraySize = 150;
let isSorting = false;
let comparisonColor = '#6C5B7B';

document.addEventListener('DOMContentLoaded', () => {
    let arrayContainer = document.getElementById('arrayContainer');
    let speedSlider = document.getElementById('speedSlider');
    let sizeSlider = document.getElementById('sizeSlider');
    let generateArrayButton = document.getElementById('generateArray');
    let bubbleSortButton = document.getElementById('bubbleSort');
    let mergeSortButton = document.getElementById('mergeSort');
    let quickSortButton = document.getElementById('quickSort');
    let selectionSortButton = document.getElementById("selectionSort");

    function generateNewArray() {
        isSorting = false;
        sortingLock(false);
        array = [];
        arraySize = sizeSlider.value;
        for (let i = 0; i < arraySize; i++){
            array.push(Math.floor(Math.random() * 100) + 1);
        }
        arrayContainer.innerHTML = '';
        drawArray();
    }

    function alterArray() {
        isSorting = false;
        sortingLock(false);
        let alterVal = sizeSlider.value - array.length;
        if (alterVal > 0) {
            for (let i = 0; i < alterVal; i++) {
                array.push(Math.floor(Math.random() * 100) + 1);
            }
        } else {
            for (let i = 0; i < Math.abs(alterVal); i++) {
                array.pop();
            }
        }
        arrayContainer.innerHTML = '';
        drawArray();
    }

    function drawArray() {
        array.forEach(value => {
            let bar = document.createElement('div');
            bar.classList.add('bar');
            bar.style.height = `${value}%`;
            arrayContainer.appendChild(bar);
        });
        updateTransitionSpeed();
    }

    function updateTransitionSpeed() {
        const bars = document.querySelectorAll('.bar');
        const transitionSpeed = 300 * (10000 - speedSlider.value) / 10000;
        bars.forEach(bar => {
            bar.style.transitionDuration = `${transitionSpeed}ms`;
        });

    }

    async function swap(i, j) {
        const bars = document.querySelectorAll('.bar');
        const distance = (j - i) * (bars[i].offsetWidth + 1.5) / 2;

        bars[i].style.transform = `translateX(${distance}px)`;
        bars[j].style.transform = `translateX(-${distance}px)`;

        await new Promise(resolve => setTimeout(resolve, 300 * (10000 - speedSlider.value) / 10000));

        [bars[i].style.height, bars[j].style.height, array[i], array[j]] = [bars[j].style.height, bars[i].style.height, array[j], array[i]]
        
        bars[i].style.transform = '';
        bars[j].style.transform = '';

    }

    async function bubbleSort() {
        isSorting = true;
        sortingLock(true);
        const bars = document.querySelectorAll('.bar');
        let n = array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (!isSorting) return;

                bars[j].style.backgroundColor = comparisonColor;
                bars[j+1].style.backgroundColor = comparisonColor;

                await new Promise(resolve => setTimeout(resolve, 150 * (10000 - speedSlider.value) / 10000));

                if (array[j] > array[j + 1]) {
                    await swap(j, j + 1);
                } else {
                    await new Promise(resolve => setTimeout(resolve, 300 * (10000 - speedSlider.value) / 10000));
                }

                bars[j].style.backgroundColor = '';
                bars[j+1].style.backgroundColor = '';

            }
        }
        isSorting = false;
        sortingLock(false);
 
    }

    async function mergeSort() {
        isSorting = true;
        sortingLock(true);
        let auxiliaryArray = array.slice();
        await mergeSortHelper(array, 0, array.length - 1, auxiliaryArray);
        isSorting = false;
        sortingLock(false);
    }

    async function mergeSortHelper(mainArray, start, end, auxiliaryArray) {
        if (start === end) return;
        const middle = Math.floor((start + end) / 2);
        await mergeSortHelper(auxiliaryArray, start, middle, mainArray);
        await mergeSortHelper(auxiliaryArray, middle + 1, end, mainArray);
        await merge(mainArray, start, middle, end, auxiliaryArray);
    }

    async function merge(mainArray, start, middle, end, auxiliaryArray) {
        const bars = document.querySelectorAll('.bar');
        let i = start;
        let j = middle + 1;
        let tempArray = [];

        while (i <= middle && j <= end) {

            if (!isSorting) return;

            bars[i].style.backgroundColor = comparisonColor;
            bars[j].style.backgroundColor = comparisonColor;

            await new Promise(resolve => setTimeout(resolve, 300 * (10000 - speedSlider.value) / 10000));

            if (auxiliaryArray[i] <= auxiliaryArray[j]) {
                tempArray.push(auxiliaryArray[i]);
                bars[i].style.backgroundColor = '';
                i++;
            } else {
                tempArray.push(auxiliaryArray[j]);
                bars[j].style.backgroundColor = '';
                j++;
            }

        }
        while (i <= middle) {

            if (!isSorting) return;

            bars[i].style.backgroundColor = comparisonColor;

            await new Promise(resolve => setTimeout(resolve, 300 * (10000 - speedSlider.value) / 10000));
            
            tempArray.push(auxiliaryArray[i]);
            bars[i].style.backgroundColor = '';
            i++;
        }
        while (j <= end) {

            if (!isSorting) return;

            bars[j].style.backgroundColor = comparisonColor;

            await new Promise(resolve => setTimeout(resolve, 300 * (10000 - speedSlider.value) / 10000));

            tempArray.push(auxiliaryArray[j]);
            bars[j].style.backgroundColor = '';
            j++;
        }

        for (let l = 0; l < tempArray.length; l++) {
            bars[start + l].style.backgroundColor = comparisonColor;
            await new Promise(resolve => setTimeout(resolve, 300 * (10000 - speedSlider.value) / 10000));
            mainArray[start + l] = tempArray[l];
            bars[start + l].style.height = `${tempArray[l]}%`;
            bars[start + l].style.backgroundColor = '';
        }
    }

    async function quickSort() {
        isSorting = true;
        sortingLock(true);
        await quickSortHelper(array, 0, array.length - 1);
        isSorting = false;
        sortingLock(false);
    }

    async function quickSortHelper(array, left, right) {
        if (left < right) {
            let pivot = await partition(array, left, right);
            await quickSortHelper(array, left, pivot - 1);
            await quickSortHelper(array, pivot + 1, right);
        }
    }

    async function partition(array, left, right) {
        let pivot = array[right];
        let i = left - 1;

        for (let j = left; j < right; j++) {
            if (!isSorting) return;

            const bars = document.querySelectorAll('.bar');
            bars[j].style.backgroundColor = comparisonColor;
            bars[right].style.backgroundColor = comparisonColor;

            await new Promise(resolve => setTimeout(resolve, 150 * (10000 - speedSlider.value) / 10000));

            if (array[j] < pivot) {
                i++;
                await swap(i, j);
            } else {
                await new Promise(resolve => setTimeout(resolve, 300 * (10000 - speedSlider.value) / 10000));
            }

            bars[j].style.backgroundColor = '';
            bars[right].style.backgroundColor = '';
        }

        await swap(i + 1, right);
        return i + 1;
    }

    async function selectionSort() {
        isSorting = true;
        sortingLock(true);

        const bars = document.querySelectorAll('.bar');
        let n = array.length;

        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            if (!isSorting) return;
            bars[i].style.backgroundColor = comparisonColor;

            for (let j = i + 1; j < n; j++)  {
                if (!isSorting) return;

                bars[j].style.backgroundColor = comparisonColor;

                await new Promise(resolve => setTimeout(resolve, 150 * (10000 - speedSlider.value) / 10000));

                if (array[j] < array[minIndex]) {
                    if (minIndex !== i) {
                        bars[minIndex].style.backgroundColor = '';
                    }
                    minIndex = j;
                } else {
                    bars[j].style.backgroundColor = '';
                }
            }

            if (minIndex !== i) {
                await swap(i, minIndex);

                await new Promise(resolve => setTimeout(resolve, 150 * (10000 - speedSlider.value) / 10000));

                bars[minIndex].style.backgroundColor = '';
            }

            bars[i].style.backgroundColor = '';
        }
        isSorting = false;
        sortingLock(false);
    }

    function sortingLock(boolean) {
        bubbleSortButton.disabled = boolean;
        mergeSortButton.disabled = boolean;
        quickSortButton.disabled = boolean;
        selectionSortButton.disabled = boolean;
    }

    generateArrayButton.addEventListener('click', generateNewArray);
    sizeSlider.addEventListener('input', alterArray);
    sizeSlider.addEventListener('input', updateTransitionSpeed);
    bubbleSortButton.addEventListener('click', bubbleSort);
    mergeSortButton.addEventListener('click', mergeSort);
    quickSortButton.addEventListener('click', quickSort);
    selectionSortButton.addEventListener('click', selectionSort);

    generateNewArray();
    
});