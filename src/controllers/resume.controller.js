import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

import Resume from "../models/resume.model.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Read uploaded PDF
    const dataBuffer = fs.readFileSync(req.file.path);

    // Load PDF
    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(dataBuffer),
    }).promise;

    let extractedText = "";

    // Loop through all pages
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => item.str)
        .join(" ");

      extractedText += pageText + "\n";
    }

    // Save in DB
    const savedResume = await Resume.create({
      fileName: req.file.filename,
      extractedText,
    });

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
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