import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  useWindowDimensions,
  Platform,
} from "react-native";
import React, { useState, useMemo } from "react";
import { useTheme } from "../../../context/themeContext";
import { ThemeType } from "../../../types/others/themeType";
import { FontSizes } from "../../../constants/typography";
import {
  Canvas,
  Image as SkiaImage,
  useImage,
  Rect,
  RoundedRect,
  Text as SkiaText,
  useFont,
  Group,
  Circle,
  LinearGradient,
  vec,
  matchFont,
} from "@shopify/react-native-skia";

type FrameType = "classic" | "minimal" | "film" | "professional" | "none";
type AspectRatio = "original" | "1:1" | "4:3" | "3:2" | "16:9" | "9:16";

type FrameImageRendererProps = {
  imageUri?: string;
  exifData?: any;
  brandLogo?: string; // 品牌logo URI
  brandName?: string; // 品牌名称
};

const FrameImageRenderer = ({
  exifData,
  imageUri,
  brandLogo,
  brandName = "Camera",
}: FrameImageRendererProps) => {
  const { theme, fonts } = useTheme();
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // 创建不同大小的字体
  const fontFamily = Platform.select({
    ios: "Helvetica",
    default: "sans-serif",
  });

  const font18 = matchFont({
    fontFamily,
    fontSize: 18,
    fontWeight: "600",
  });

  const font16 = matchFont({
    fontFamily,
    fontSize: 16,
    fontWeight: "600",
  });

  const font14 = matchFont({
    fontFamily,
    fontSize: 14,
    fontWeight: "normal",
  });

  const font13 = matchFont({
    fontFamily,
    fontSize: 13,
    fontWeight: "normal",
  });

  const font12 = matchFont({
    fontFamily,
    fontSize: 12,
    fontWeight: "normal",
  });

  const font11 = matchFont({
    fontFamily,
    fontSize: 11,
    fontWeight: "normal",
  });

  // 状态管理
  const [selectedFrame, setSelectedFrame] = useState<FrameType>("classic");
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("original");
  const [showDateTime, setShowDateTime] = useState(true);
  const [showExif, setShowExif] = useState(true);

  const styles = createStyles(theme, fonts);

  // 加载图片和字体（Skia）
  const image = useImage(imageUri);
  const logoImage = useImage(brandLogo);

  // 从EXIF提取关键参数
  const params = useMemo(() => {
    if (!exifData) return null;

    return {
      aperture: exifData.FNumber || exifData.ApertureValue || "f/--",
      shutterSpeed: exifData.ExposureTime || exifData.ShutterSpeedValue || "--",
      iso: exifData.ISOSpeedRatings || exifData.ISO || "--",
      focalLength: exifData.FocalLength || "--",
      camera: exifData.Model || exifData.Make || brandName,
      lens: exifData.LensModel || exifData.LensMake || "--",
      date: exifData.DateTime || exifData.DateTimeOriginal || "--",
    };
  }, [exifData, brandName]);

  // 计算图片显示尺寸和位置
  const imageLayout = useMemo(() => {
    if (!image) return null;

    const canvasWidth = screenWidth - 32;
    const canvasHeight = screenHeight * 0.6;

    let targetWidth = image.width();
    let targetHeight = image.height();

    // 根据比例调整
    if (aspectRatio !== "original") {
      const ratioMap: Record<AspectRatio, number> = {
        original: targetWidth / targetHeight,
        "1:1": 1,
        "4:3": 4 / 3,
        "3:2": 3 / 2,
        "16:9": 16 / 9,
        "9:16": 9 / 16,
      };

      const ratio = ratioMap[aspectRatio];
      if (ratio > targetWidth / targetHeight) {
        targetHeight = targetWidth / ratio;
      } else {
        targetWidth = targetHeight * ratio;
      }
    }

    // 缩放到适应画布
    const scale = Math.min(
      canvasWidth / targetWidth,
      canvasHeight / targetHeight
    );
    const scaledWidth = targetWidth * scale;
    const scaledHeight = targetHeight * scale;

    return {
      x: (canvasWidth - scaledWidth) / 2,
      y: (canvasHeight - scaledHeight) / 2,
      width: scaledWidth,
      height: scaledHeight,
      canvasWidth,
      canvasHeight,
    };
  }, [image, aspectRatio, screenWidth, screenHeight]);

  // Skia 渲染经典边框
  const renderClassicFrameSkia = () => {
    if (!imageLayout || !params || selectedFrame !== "classic") return null;

    const { x, y, width, height } = imageLayout;
    const padding = 12;
    const barHeight = 60;

    return (
      <Group>
        {/* 顶部栏 */}
        {showDateTime && (
          <>
            <RoundedRect
              x={x}
              y={y}
              width={width}
              height={barHeight}
              r={8}
              color="rgba(0,0,0,0.85)"
            />
            <SkiaText
              x={x + padding}
              y={y + barHeight / 2 + 8}
              text={params.camera}
              font={font18}
              color="white"
            />
          </>
        )}

        {/* 底部参数栏 */}
        {showExif && (
          <>
            <RoundedRect
              x={x}
              y={y + height - barHeight}
              width={width}
              height={barHeight}
              r={8}
              color="rgba(0,0,0,0.85)"
            />
            {/* 参数显示 */}
            <SkiaText
              x={x + padding}
              y={y + height - barHeight / 2 + 8}
              text={`${params.aperture} • ${params.shutterSpeed} • ISO ${params.iso} • ${params.focalLength}mm`}
              font={font14}
              color="white"
            />
          </>
        )}
      </Group>
    );
  };

  // Skia 渲染极简边框
  const renderMinimalFrameSkia = () => {
    if (!imageLayout || !params || selectedFrame !== "minimal") return null;

    const { x, y, width, height } = imageLayout;
    const barHeight = 40;
    const padding = 12;

    return (
      <Group>
        {showExif && (
          <>
            <Rect
              x={x}
              y={y + height - barHeight}
              width={width}
              height={barHeight}
              color="rgba(255,255,255,0.95)"
            />
            <SkiaText
              x={x + padding}
              y={y + height - barHeight / 2 + 5}
              text={`${params.aperture} • ${params.shutterSpeed} • ISO ${params.iso} • ${params.focalLength}mm`}
              font={font12}
              color="#333"
            />
          </>
        )}
      </Group>
    );
  };

  // Skia 渲染胶片边框
  const renderFilmFrameSkia = () => {
    if (!imageLayout || !params || selectedFrame !== "film") return null;

    const { x, y, width, height } = imageLayout;
    const holeSize = 6;
    const holeSpacing = width / 9;
    const filmBarHeight = 24;

    return (
      <Group>
        {/* 顶部胶片孔 */}
        <Rect
          x={x}
          y={y - filmBarHeight}
          width={width}
          height={filmBarHeight}
          color="black"
        />
        {[...Array(8)].map((_, i) => (
          <Circle
            key={`top-${i}`}
            cx={x + holeSpacing * (i + 0.5)}
            cy={y - filmBarHeight / 2}
            r={holeSize / 2}
            color="#333"
          />
        ))}

        {/* 底部胶片孔和信息 */}
        {showExif && (
          <>
            <Rect
              x={x}
              y={y + height}
              width={width}
              height={filmBarHeight + 60}
              color="black"
            />
            <SkiaText
              x={x + 12}
              y={y + height + 30}
              text={params.camera}
              font={font14}
              color="white"
            />
            {showDateTime && (
              <SkiaText
                x={x + 12}
                y={y + height + 50}
                text={params.date}
                font={font11}
                color="#888"
              />
            )}
            {[...Array(8)].map((_, i) => (
              <Circle
                key={`bottom-${i}`}
                cx={x + holeSpacing * (i + 0.5)}
                cy={y + height + filmBarHeight + 60 - filmBarHeight / 2}
                r={holeSize / 2}
                color="#333"
              />
            ))}
          </>
        )}
      </Group>
    );
  };

  // Skia 渲染专业边框
  const renderProfessionalFrameSkia = () => {
    if (!imageLayout || !params || selectedFrame !== "professional")
      return null;

    const { x, y, width, height } = imageLayout;
    const barHeight = 80;
    const padding = 16;

    return (
      <Group>
        {showExif && (
          <>
            <Rect
              x={x}
              y={y + height - barHeight}
              width={width}
              height={barHeight}
              color="rgba(0,0,0,0.9)"
            />

            {/* 相机名称 */}
            <SkiaText
              x={x + padding}
              y={y + height - barHeight + 25}
              text={params.camera}
              font={font16}
              color="white"
            />

            {/* 镜头名称 */}
            <SkiaText
              x={x + padding}
              y={y + height - barHeight + 45}
              text={params.lens}
              font={font12}
              color="#888"
            />

            {/* 参数行 */}
            <SkiaText
              x={x + padding}
              y={y + height - barHeight + 65}
              text={`${params.aperture} • ${params.shutterSpeed} • ISO ${params.iso} • ${params.focalLength}mm`}
              font={font13}
              color="white"
            />
          </>
        )}
      </Group>
    );
  };

  return (
    <View style={styles.container}>
      {/* Skia Canvas - 零延迟渲染 */}
      {imageUri && imageLayout && (
        <View style={styles.canvasContainer}>
          <Canvas
            style={{
              width: imageLayout.canvasWidth,
              height: imageLayout.canvasHeight,
            }}
          >
            {/* 背景 */}
            <RoundedRect
              x={0}
              y={0}
              width={imageLayout.canvasWidth}
              height={imageLayout.canvasHeight}
              r={12}
              color="#1a1a1a"
            />

            {/* 图片 */}
            {image && (
              <SkiaImage
                image={image}
                x={imageLayout.x}
                y={imageLayout.y}
                width={imageLayout.width}
                height={imageLayout.height}
                fit="cover"
              />
            )}

            {/* 渲染边框 - 直接在 GPU 渲染，零延迟 */}
            {renderClassicFrameSkia()}
            {renderMinimalFrameSkia()}
            {renderFilmFrameSkia()}
            {renderProfessionalFrameSkia()}
          </Canvas>
        </View>
      )}

      {/* 控制面板 */}
      {imageUri && (
        <View style={styles.controlPanel}>
          {/* 比例选择器 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>画幅比例</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.optionScroll}
            >
              {(
                [
                  "original",
                  "1:1",
                  "4:3",
                  "3:2",
                  "16:9",
                  "9:16",
                ] as AspectRatio[]
              ).map((ratio) => (
                <TouchableOpacity
                  key={ratio}
                  style={[
                    styles.option,
                    aspectRatio === ratio && styles.optionSelected,
                  ]}
                  onPress={() => setAspectRatio(ratio)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      aspectRatio === ratio && styles.optionTextSelected,
                    ]}
                  >
                    {ratio === "original" ? "原始" : ratio}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* 边框样式选择器 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>边框样式</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.optionScroll}
            >
              {(
                [
                  "classic",
                  "minimal",
                  "film",
                  "professional",
                  "none",
                ] as FrameType[]
              ).map((frameType) => (
                <TouchableOpacity
                  key={frameType}
                  style={[
                    styles.option,
                    selectedFrame === frameType && styles.optionSelected,
                  ]}
                  onPress={() => setSelectedFrame(frameType)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedFrame === frameType && styles.optionTextSelected,
                    ]}
                  >
                    {frameType === "classic" && "经典"}
                    {frameType === "minimal" && "极简"}
                    {frameType === "film" && "胶片"}
                    {frameType === "professional" && "专业"}
                    {frameType === "none" && "无边框"}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* 显示开关 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>显示选项</Text>
            <View style={styles.toggleContainer}>
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>显示时间</Text>
                <Switch
                  value={showDateTime}
                  onValueChange={setShowDateTime}
                  trackColor={{ false: "#767577", true: theme.borderAccent }}
                  thumbColor={showDateTime ? "#fff" : "#f4f3f4"}
                />
              </View>
              <View style={styles.toggleRow}>
                <Text style={styles.toggleLabel}>显示 EXIF</Text>
                <Switch
                  value={showExif}
                  onValueChange={setShowExif}
                  trackColor={{ false: "#767577", true: theme.borderAccent }}
                  thumbColor={showExif ? "#fff" : "#f4f3f4"}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const createStyles = (theme: ThemeType, fonts: FontSizes) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    canvasContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },

    //------控制面板------
    controlPanel: {
      backgroundColor: theme.backgroundColor,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: theme.borderBody,
      maxHeight: 280,
    },
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: fonts.body,
      fontWeight: "600",
      color: theme.textBody,
      paddingHorizontal: 16,
      marginBottom: 12,
    },
    optionScroll: {
      paddingHorizontal: 16,
    },
    option: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      marginRight: 12,
      borderRadius: 20,
      backgroundColor: theme.backgroundColor,
      borderWidth: 1,
      borderColor: theme.borderBody,
    },
    optionSelected: {
      backgroundColor: theme.borderAccent,
      borderColor: theme.borderAccent,
    },
    optionText: {
      fontSize: fonts.body,
      color: theme.textBody,
    },
    optionTextSelected: {
      color: "#fff",
      fontWeight: "600",
    },

    //------开关控制------
    toggleContainer: {
      paddingHorizontal: 16,
    },
    toggleRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
    },
    toggleLabel: {
      fontSize: fonts.body,
      color: theme.textBody,
    },
  });
};

export default FrameImageRenderer;
