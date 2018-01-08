package cn.com.cis.mi.osp.common;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/**
 * Created by localadmin on 16/5/5.
 */
public class ExcelHelper {

    public XSSFWorkbook wb = new XSSFWorkbook();

    //导出
    public void exportExcel(String fName, HttpServletResponse response) {
        try {
            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-disposition", "attachment;filename=" + new String(fName.getBytes("gb2312"), "ISO8859-1"));
            OutputStream outputStream = response.getOutputStream();
            wb.write(outputStream);
            outputStream.flush();
            outputStream.close();
        } catch (Exception e) {
            //
        }
    }

    public void createExcelHeader(String[] arr) {
        XSSFSheet sheet = wb.createSheet("Sheet1");
        XSSFRow row = sheet.createRow(0);
        XSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        for (int i = 0; i < arr.length; i++) {
            XSSFCell cell = row.createCell(i);
            cell.setCellValue(arr[i]);
            cell.setCellStyle(style);
            sheet.autoSizeColumn(i);
        }
    }

    public void createExcelRow(String[] arr) {
        XSSFSheet sheet = wb.getSheet("Sheet1");
        XSSFRow row = sheet.createRow(sheet.getLastRowNum() + 1);
        for (int i = 0; i < arr.length; i++) {
            row.createCell(i).setCellValue(arr[i]);
        }
    }

    //导入
    public List<List<String>> importExcel(CommonsMultipartFile file) {
        try {
            List<List<String>> result=new ArrayList<List<String>>();
            if (!file.isEmpty()) {
                DateFormat format1 = new java.text.SimpleDateFormat("yyyyMMddHHmmss");
                String fileName = file.getOriginalFilename();
                String prefix = fileName.substring(fileName.lastIndexOf(".") + 1);
                String fName = fileName.substring(0, fileName.lastIndexOf(".")) + format1.format(new Date());
                String classPath = this.getClass().getClassLoader().getResource("/").getPath();
                classPath = classPath.substring(0, classPath.lastIndexOf("/classes/"));
                File filePath = new File(classPath + "/statics/image/upload/");
                if (!filePath.exists() && !filePath.isDirectory()) {
                    filePath.mkdir();
                }
                String savePath = filePath.getPath();
                File saveFile = new File(new File(savePath), fName + "." + prefix);
                file.transferTo(saveFile);
                InputStream instream = new FileInputStream(saveFile);
                if (prefix.equals("xls")) {
                    HSSFWorkbook hssfWorkbook = new HSSFWorkbook(instream);
                    HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(0);
                    if (hssfSheet == null) {
                        return null;
                    }
                    for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
                        HSSFRow hssfRow = hssfSheet.getRow(rowNum);
                        List<String> listRow=new ArrayList<String>();
                        for(int j=hssfRow.getFirstCellNum();j<hssfRow.getLastCellNum();j++){
                            listRow.add(getStringVal(hssfRow.getCell(j)));
                        }
                        result.add(listRow);
                    }
                }
                if (prefix.equals("xlsx")) {
                    XSSFWorkbook xssfWorkbook = new XSSFWorkbook(instream);
                    XSSFSheet xssfSheet = xssfWorkbook.getSheetAt(0);
                    if (xssfSheet == null) {
                        return null;
                    }
                    for (int rowNum = 1; rowNum <= xssfSheet.getLastRowNum(); rowNum++) {
                        XSSFRow xssfRow = xssfSheet.getRow(rowNum);
                        List<String> listRow = new ArrayList<String>();
                        for (int j = xssfRow.getFirstCellNum(); j < xssfRow.getLastCellNum(); j++) {
                            listRow.add(getStringVal(xssfRow.getCell(j)));
                        }
                        result.add(listRow);
                    }
                }
                //导入完成删除文件
                saveFile.delete();
                return result;
            } else {
                return null;
            }
        } catch (Exception ex) {
            return null;
        }

    }

    public String getStringVal(HSSFCell cell) {
        if (cell == null) {
            return "";
        }
        switch (cell.getCellType()) {
            case Cell.CELL_TYPE_BOOLEAN:
                return cell.getBooleanCellValue() ? "true" : "false";
            case Cell.CELL_TYPE_FORMULA:
                return cell.getCellFormula();
            case Cell.CELL_TYPE_NUMERIC:
                cell.setCellType(Cell.CELL_TYPE_STRING);
                return cell.getStringCellValue();
            case Cell.CELL_TYPE_STRING:
                return cell.getStringCellValue();
            default:
                return "";
        }
    }

    public String getStringVal(XSSFCell cell) {
        if (cell == null) {
            return "";
        }
        switch (cell.getCellType()) {
            case Cell.CELL_TYPE_BOOLEAN:
                return cell.getBooleanCellValue() ? "true" : "false";
            case Cell.CELL_TYPE_FORMULA:
                return cell.getCellFormula();
            case Cell.CELL_TYPE_NUMERIC:
                if (HSSFDateUtil.isCellDateFormatted(cell)) {
                    //  如果是date类型则 ，获取该cell的date值
                    return new SimpleDateFormat("yyyy/MM/dd").format(HSSFDateUtil.getJavaDate(cell.getNumericCellValue()));
                } else { // 纯数字
                    cell.setCellType(Cell.CELL_TYPE_STRING);
                }
                return cell.getStringCellValue();
            case Cell.CELL_TYPE_STRING:
                return cell.getStringCellValue();
            default:
                return "";
        }
    }
}
