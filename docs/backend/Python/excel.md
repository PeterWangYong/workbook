# excel自动化



## 工作簿

```python
import xlwings as xw

# 打开excel应用，visible显示应用窗口, add_book新建工作簿
app = xw.App(visible=True, add_book=False)

# 新建工作簿
# workbook = app.books.add()

# 打开工作簿
workbook = app.books.open("example.xlsx")

# 保存工作簿
workbook.save("example.xlsx")

# 关闭工作簿
workbook.close()

# 关闭excel应用
app.quit()
```

## 工作表

```python
import xlwings as xw

app = xw.App(visible=False, add_book=False)

workbook = app.books.add()

# 新建工作表
worksheet = workbook.sheets.add("产品统计表")

# 单元格A1
worksheet.range("A1").value = "编号"

workbook.save("beijing.xlsx")

workbook.close()

app.quit()
```

