import { useTheme } from '../../../context/themeContext';
import { FontSizeScaleEnum } from '../../../types/enums';

const FONT_SIZE_ORDER = [
  FontSizeScaleEnum.SMALL,
  FontSizeScaleEnum.MEDIUM,
  FontSizeScaleEnum.LARGE,
  FontSizeScaleEnum.XLARGE,
];

const FONT_SIZE_LABELS = {
  [FontSizeScaleEnum.SMALL]: 'Small',
  [FontSizeScaleEnum.MEDIUM]: 'Medium',
  [FontSizeScaleEnum.LARGE]: 'Large',
  [FontSizeScaleEnum.XLARGE]: 'Extra Large',
};

const useFontSize = () => {
  const { fontSizeScale, setFontSizeScale } = useTheme();

  const currentIndex = FONT_SIZE_ORDER.indexOf(fontSizeScale);

  const increaseFontSize = () => {
    if (currentIndex < FONT_SIZE_ORDER.length - 1) {
      setFontSizeScale(FONT_SIZE_ORDER[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    if (currentIndex > 0) {
      setFontSizeScale(FONT_SIZE_ORDER[currentIndex - 1]);
    }
  };

  const canIncrease = currentIndex < FONT_SIZE_ORDER.length - 1;
  const canDecrease = currentIndex > 0;

  const currentLabel = FONT_SIZE_LABELS[fontSizeScale];

  return {
    fontSizeScale,
    currentLabel,
    increaseFontSize,
    decreaseFontSize,
    canIncrease,
    canDecrease,
    fontSizeOptions: FONT_SIZE_ORDER,
    fontSizeLabels: FONT_SIZE_LABELS,
  };
};

export default useFontSize;
