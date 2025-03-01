"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  CheckCircle,
  Circle,
  Code,
  Layout,
  Box,
  FileText,
  Layers,
  Settings,
  Monitor,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const TreeVisualization = ({ items = [] }) => {
  const [expandedNodes, setExpandedNodes] = useState({});
  const [completedItems, setCompletedItems] = useState({});

  // Get icon based on content
  const getTopicIcon = (text) => {
    const iconProps = { size: 18, className: "mr-2" };
    if (text.toLowerCase().includes("html")) return <Code {...iconProps} />;
    if (text.toLowerCase().includes("css")) return <Layout {...iconProps} />;
    if (text.toLowerCase().includes("javascript"))
      return <Box {...iconProps} />;
    if (text.toLowerCase().includes("components"))
      return <Layers {...iconProps} />;
    if (text.toLowerCase().includes("attributes"))
      return <Settings {...iconProps} />;
    return <FileText {...iconProps} />;
  };

  const toggleExpand = (id) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleComplete = (id) => {
    setCompletedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderNode = (node, index, parentId = "") => {
    const nodeId = `${parentId}-${index}`;
    const isExpanded = expandedNodes[nodeId];
    const isCompleted = completedItems[nodeId];
    const hasChildren = node.children && node.children.length > 0;
    const indentLevel = node.level || 0;

    return (
      <div key={nodeId} className="relative">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          className={`
            relative flex items-center p-3 my-1 rounded-lg
            ${hasChildren ? "cursor-pointer" : "ml-6"}
            ${isCompleted ? "bg-green-50" : "bg-white"}
            hover:bg-gray-50 transition-colors
            border border-gray-100 shadow-sm
          `}
          style={{ marginLeft: `${indentLevel * 20}px` }}
          onClick={() => hasChildren && toggleExpand(nodeId)}
        >
          <div className="flex items-center flex-1">
            {hasChildren && (
              <span className="mr-2 text-gray-400">
                {isExpanded ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </span>
            )}
            {getTopicIcon(node.text)}
            <span
              className={`flex-1 text-sm ${
                isCompleted ? "text-gray-500" : "text-gray-700"
              }`}
            >
              {node.text}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleComplete(nodeId);
              }}
              className={`ml-2 p-1 rounded-full transition-colors
                ${
                  isCompleted
                    ? "text-green-500 hover:text-green-600"
                    : "text-gray-300 hover:text-gray-400"
                }
              `}
            >
              {isCompleted ? <CheckCircle size={18} /> : <Circle size={18} />}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-4"
            >
              {node.children.map((child, childIndex) =>
                renderNode(child, childIndex, nodeId)
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const buildTreeStructure = (items) => {
    if (!Array.isArray(items) || items.length === 0) {
      return [];
    }

    const tree = [];
    const itemMap = {};

    items.forEach((item, index) => {
      const node = {
        id: index,
        text: item.text,
        level: item.level,
        children: [],
      };
      itemMap[index] = node;

      if (item.level === 0) {
        tree.push(node);
      }
    });

    for (let i = 0; i < items.length; i++) {
      const currentItem = items[i];
      const currentNode = itemMap[i];

      if (currentItem.level === 0) continue;

      for (let j = i - 1; j >= 0; j--) {
        if (items[j].level === currentItem.level - 1) {
          itemMap[j].children.push(currentNode);
          break;
        }
      }
    }

    return tree;
  };

  const tree = buildTreeStructure(items);

  if (tree.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-500">
        <Monitor size={48} className="mb-4" />
        <p>No learning path available yet. Enter a subject to get started!</p>
      </div>
    );
  }

  // Calculate completion percentage
  const totalItems = Object.keys(completedItems).length;
  const completedCount = Object.values(completedItems).filter(Boolean).length;
  const completionPercentage =
    totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">
            Learning Progress
          </h3>
          <span className="text-sm text-gray-500">
            {completionPercentage}% Complete
          </span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      <div className="space-y-2">
        {tree.map((node, index) => renderNode(node, index))}
      </div>
    </div>
  );
};
