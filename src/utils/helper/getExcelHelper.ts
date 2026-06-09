/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs';
import * as path from 'path';

import * as XLSX from 'xlsx';

/**
 * Excel processor for reading and filtering data from Excel files.
 * Uses Node.js fs (compatible with Playwright) instead of Cypress cy.readFile.
 */
export class ExcelProcessor {
  private workbook: XLSX.WorkBook | null = null;
  private worksheet: XLSX.WorkSheet | null = null;

  private constructor() {}

  /**
   * Creates an ExcelProcessor by reading an Excel file from disk.
   * @param filePath - Absolute or relative path to the Excel file
   * @param sheetIndex - Zero-based sheet index to use (default: 1 for second sheet)
   * @returns Initialized ExcelProcessor instance
   */
  static fromFile(filePath: string, sheetIndex: number = 1): ExcelProcessor {
    const processor = new ExcelProcessor();
    const resolvedPath = path.resolve(filePath);
    const fileBuffer = fs.readFileSync(resolvedPath);

    processor.workbook = XLSX.read(fileBuffer, { type: 'buffer' });

    if (processor.workbook.SheetNames.length > sheetIndex) {
      const sheetName = processor.workbook.SheetNames[sheetIndex];
      processor.worksheet = processor.workbook.Sheets[sheetName];
    }

    return processor;
  }

  getFilteredData(): Array<any> {
    if (!this.worksheet) {
      console.warn('Worksheet is not loaded.');
      return [];
    }

    const columnsToExtract = [4, 7, 9, 10, 11, 14, 20]; // E, H, J, K, L, O, U
    const extractedData: Array<any> = [];

    const ref = this.worksheet['!ref'];
    if (typeof ref === 'string') {
      const range = XLSX.utils.decode_range(ref);
      for (let row = range.s.r; row <= range.e.r; ++row) {
        const rowData: any = {};
        for (const col of columnsToExtract) {
          const cellRef = XLSX.utils.encode_cell({ c: col, r: row });
          const cell = this.worksheet[cellRef];
          if (cell) {
            rowData[col] = cell.v;
          }
        }
        extractedData.push(rowData);
      }
    } else {
      console.warn("Sheet reference '!ref' is undefined.");
    }

    return extractedData;
  }

  filterByValue(columnIndex: number, value: any, targetColumnIndex: number): Array<any> {
    const data = this.getFilteredData();
    return data.filter(row => row[columnIndex] === value).map(row => row[targetColumnIndex]);
  }
}
