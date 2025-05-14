// Получаем элементы интерфейса
const ratioInput = document.getElementById('ratio-input');
const volumeInput = document.getElementById('volume-input');
const concentrateResult = document.getElementById('concentrate-result');
const totalResult = document.getElementById('total-result');
const volumeButtons = document.querySelectorAll('.volume-btn');

// Функция расчета концентрации
function calculateConcentration() {
    try {
        const ratio = parseFloat(ratioInput.value);
        const volume = parseFloat(volumeInput.value);
        
        if (isNaN(ratio) || isNaN(volume) || ratio <= 0 || volume <= 0) {
            concentrateResult.textContent = "Ошибка";
            totalResult.textContent = "-";
            return;
        }
        
        // Расчет объема концентрата и общего объема
        const ratioCoef = 1 / ratio;  // Например, 1:10 -> 0.1
        const concentrateVolume = volume * ratioCoef;  // Объем концентрата
        const totalVolume = volume + concentrateVolume;  // Общий объем
        
        // Форматируем результат для концентрата
        let resultText;
        if (concentrateVolume < 1) {
            resultText = `${(concentrateVolume * 1000).toFixed(1)} мл`;
        } else {
            resultText = `${concentrateVolume.toFixed(2)} л`;
        }
        
        concentrateResult.textContent = resultText;
        totalResult.textContent = `${totalVolume.toFixed(2)} л`;
        
    } catch (error) {
        concentrateResult.textContent = "Ошибка";
        totalResult.textContent = "-";
    }
}

// Устанавливаем обработчики событий
ratioInput.addEventListener('input', calculateConcentration);
volumeInput.addEventListener('input', calculateConcentration);

// Обработчик для кнопок стандартных объемов
volumeButtons.forEach(button => {
    button.addEventListener('click', () => {
        volumeInput.value = button.getAttribute('data-volume');
        calculateConcentration();
    });
});

// Первичный расчет при загрузке страницы
document.addEventListener('DOMContentLoaded', calculateConcentration); 