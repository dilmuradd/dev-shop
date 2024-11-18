import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Image, Transformer } from 'react-konva';
import useImage from 'use-image';

const ImageCanvas = ({ imageSrc, className }) => {
  const [image] = useImage(imageSrc);
  const [selected, setSelected] = useState(false);
  const imageRef = useRef();
  const stageRef = useRef();
  const layerRef = useRef();
  const trRef = useRef();
  const GUIDELINE_OFFSET = 5;

  useEffect(() => {
    if (selected && trRef.current && imageRef.current) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
      console.log("Transformer attached successfully");
    }
  }, [selected]);

  const handleSelect = () => {
    setSelected(true);
  };

  const handleTransformEnd = () => {
    const node = imageRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    node.width(node.width() * scaleX);
    node.height(node.height() * scaleY);
    console.log("New width:", node.width());
    console.log("New height:", node.height());
  };

  const onDragEnd = (e) => {
    const layer = e.target.getLayer();
    // eski guideline'larni faqatgina ular mavjud bo'lsa tozalash
    layer.find('.guid-line').forEach((line) => line.destroy());
  
    // Yangi guideline'larni chizish yoki boshqa ishlar
    const imageNode = e.target;
    console.log('Rasm yangi pozitsiya:', imageNode.x(), imageNode.y());
  };
  

  useEffect(() => {
    const stage = stageRef.current;
    const layer = layerRef.current;

    if (!stage || !layer) return;

    const imageNode = imageRef.current;
    if (imageNode) {
      imageNode.on("dragmove", onDragMove);
      imageNode.on("dragend", onDragEnd);
    }

    layer.draw();
  }, [image]);

  const getLineGuideStops = (skipShape) => {
    // Faqat logo (imageRef) uchun ishlatish
    if (skipShape !== imageRef.current) return { vertical: [], horizontal: [] };
  
    const stage = skipShape.getStage();
    if (!stage) return { vertical: [], horizontal: [] };
  
    // Stage va boshqa logicni faqat logo uchun bajarish
    const vertical = [0, stage.width() / 2, stage.width()];
    const horizontal = [0, stage.height() / 2, stage.height()];
  
    stage.find(".object").forEach((guideItem) => {
      if (guideItem === skipShape) {
        return;
      }
      const box = guideItem.getClientRect();
      vertical.push(box.x, box.x + box.width, box.x + box.width / 2);
      horizontal.push(box.y, box.y + box.height, box.y + box.height / 2);
    });
    return {
      vertical,
      horizontal
    };
  };
  
  const getObjectSnappingEdges = React.useCallback((node) => {
      const box = node.getClientRect();
      const absPos = node.absolutePosition();

      return {
        vertical: [
          {
            guide: Math.round(box.x),
            offset: Math.round(absPos.x - box.x),
            snap: "start"
          },
          {
            guide: Math.round(box.x + box.width / 2),
            offset: Math.round(absPos.x - box.x - box.width / 2),
            snap: "center"
          },
          {
            guide: Math.round(box.x + box.width),
            offset: Math.round(absPos.x - box.x - box.width),
            snap: "end"
          }
        ],
        horizontal: [
          {
            guide: Math.round(box.y),
            offset: Math.round(absPos.y - box.y),
            snap: "start"
          },
          {
            guide: Math.round(box.y + box.height / 2),
            offset: Math.round(absPos.y - box.y - box.height / 2),
            snap: "center"
          },
          {
            guide: Math.round(box.y + box.height),
            offset: Math.round(absPos.y - box.y - box.height),
            snap: "end"
          }
        ]
      };
    },
    []
  );

  const getGuides = React.useCallback((lineGuideStops, itemBounds) => {
      const resultV  = [];

      const resultH = [];

      lineGuideStops.vertical.forEach((lineGuide) => {
        itemBounds.vertical.forEach((itemBound) => {
          const diff = Math.abs(lineGuide - itemBound.guide);
          if (diff < GUIDELINE_OFFSET) {
            resultV.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset
            });
          }
        });
      });

      lineGuideStops.horizontal.forEach((lineGuide) => {
        itemBounds.horizontal.forEach((itemBound) => {
          const diff = Math.abs(lineGuide - itemBound.guide);
          if (diff < GUIDELINE_OFFSET) {
            resultH.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset
            });
          }
        });
      });

      const guides = [];

      const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
      const minH = resultH.sort((a, b) => a.diff - b.diff)[0];

      if (minV) {
        guides.push({
          lineGuide: minV.lineGuide,
          offset: minV.offset,
          orientation: "V",
          snap: minV.snap
        });
      }

      if (minH) {
        guides.push({
          lineGuide: minH.lineGuide,
          offset: minH.offset,
          orientation: "H",
          snap: minH.snap
        });
      }

      return guides;
    },
    []
  );

  const drawGuides = React.useCallback((guides, layer) => {
      guides.forEach((lg) => {
        if (lg.orientation === "H") {
          const line = new Konva.Line({
            points: [-6000, 0, 6000, 0],
            stroke: "rgb(0, 161, 255)",
            strokeWidth: 1,
            name: "guid-line",
            dash: [4, 6]
          });
          layer.add(line);
          line.absolutePosition({
            x: 0,
            y: lg.lineGuide
          });
        } else if (lg.orientation === "V") {
          const line = new Konva.Line({
            points: [0, -6000, 0, 6000],
            stroke: "rgb(0, 161, 255)",
            strokeWidth: 1,
            name: "guid-line",
            dash: [4, 6]
          });
          layer.add(line);
          line.absolutePosition({
            x: lg.lineGuide,
            y: 0
          });
        }
      });
    },
    []
  );

  const onDragMove = (e) => {
    // Faqat logo uchun guidelarni yaratish
    if (e.target !== imageRef.current) return;
  
    const layer = e.target.getLayer();
    
    // Eski guidelarni o'chirish
    layer.find('.guid-line').forEach((line) => line.destroy());
    
    // Yangi guide turlarini olish
    const lineGuideStops = getLineGuideStops(e.target);
    const itemBounds = getObjectSnappingEdges(e.target);
    const guides = getGuides(lineGuideStops, itemBounds);
    
    // Agar guide topilmasa, hech narsa qilish shart emas
    if (!guides.length) return;
  
    // Yangi guidelarni chizish
    drawGuides(guides, layer);
    
    const absPos = e.target.absolutePosition();
    guides.forEach((lg) => {
      switch (lg.snap) {
        case "start":
        case "center":
        case "end":
          if (lg.orientation === 'V') absPos.x = lg.lineGuide + lg.offset;
          if (lg.orientation === 'H') absPos.y = lg.lineGuide + lg.offset;
          break;
      }
    });
  
    // Yangi pozitsiyani belgilash
    e.target.absolutePosition(absPos);
  };
  

  return (
    <Stage
      ref={stageRef}
      className={className}
      width={window.innerWidth / 2}
      height={window.innerHeight}
    >
      <Layer ref={layerRef}>
        <Image
          id="image"
          image={image}
          ref={imageRef}
          x={100}
          y={100}
          draggable
          onClick={handleSelect}
          onTap={handleSelect}
          onTransformEnd={handleTransformEnd}
        />
        {selected && (
          <Transformer
            ref={trRef}
            rotateEnabled={true}
            enabledAnchors={[
              'top-left',
              'top-right',
              'bottom-left',
              'bottom-right',
            ]}
            boundBoxFunc={(oldBox, newBox) => newBox}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default ImageCanvas;
