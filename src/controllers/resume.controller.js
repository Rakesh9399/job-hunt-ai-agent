import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

import Resume from "../models/resume.model.js";

import { analyzeResumeWithAI } from "../services/resumeAnalyzer.service.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Read PDF
    const dataBuffer = fs.readFileSync(req.file.path);

    // Load PDF
    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(dataBuffer),
    }).promise;

    let extractedText = "";

    // Extract all pages text
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => item.str)
        .join(" ");

      extractedText += pageText + "\n";
    }

    // AI Analyze
    const aiData = await analyzeResumeWithAI(
      extractedText
    );

    // Save in DB
    const savedResume = await Resume.create({
      fileName: req.file.filename,
      extractedText,
      aiData,
    });

    res.status(201).json({
      success: true,
      message:
        "Resume uploaded and analyzed successfully",
      data: savedResume,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};