# website link: https://givemereport-github-io.vercel.app
# This file is uploading all data in database which shown below
#      1. Customer Name            ---    Tell about Customer Name
#      2. Customer PinCode         ---    Customer PinCode So anaylsis can be done all over india
#      3. Date                     ---    Get the record date wise and help in analysis
#      4. Order Quantity           ---    Specify Qunatity
#      5. Product ID               ---    Derived from skuId and tell which product is ordered
#      6. Amount                   ---    Tells about how much customer spent on specific amount
#      7. Sku ID                   ---    Sku ID  Which sku id is more relevence
#      8. E-Commerce ID            ---    Tells which E-Commerce is belong to
#  For Meesho PDF
# page.cropbox.lower_left = (0, 110)
# page.cropbox.upper_left = (0,411)

# import mysql.connector
# import PyPDF2
# import re


# mydb = mysql.connector.connect(
#     host="localhost",
#     user="root",
#     password="",
#     database="dcmr",

# )



import os
from flask import Flask, request, render_template, jsonify,send_from_directory,send_file
from flask_cors import CORS
from flask import make_response
# import pdfkit


from werkzeug.datastructures import MultiDict
import PyPDF2
# import PyPDF2
import re
import mysql.connector
import PyPDF2
import re

import mysql.connector
import PyPDF2
import re

from PyPDF2 import PdfFileReader, PdfFileWriter

app = Flask(__name__)
CORS(app)


@app.post('/')
def abc():

    name = request.values
    print(name)
    print(request.files)
    # return "hello"
    f = request.files['static_file']
    f.save(f.filename)
    name = os.rename(f.filename, "test121.pdf")
    
    # reading file one by one 

    pdfFileObj = open('test121.pdf', 'rb')
    maindic = {}
    writer = PdfFileWriter()

    # create writier object


    pdfReader = PyPDF2.PdfFileReader(pdfFileObj, strict=False)
    mydicc = {}
    for i in range(0, pdfReader.numPages):

        # reading a page one by one and store in page object
        page = pdfReader.pages[i]

        # croping page
        page.cropbox.lower_left = (170, 467)
        page.cropbox.upper_left = (170,820)
        page.cropbox.lower_right = (425,467)
        page.cropbox.upper_right = (425,820)

        # append page one by one
        writer.add_page(page)






        pageObj = pdfReader.getPage(i)

        # page_content=pageObj.extract_text()

        # all page content
        text = pageObj.extractText()
        mydicc[i] = text



    writer.add_js("this.print({bUI:true,bSilent:false,bShrinkToFit:true});")

    with open("pypdf-output2.pdf", "wb") as out_f:
        writer.write(out_f)

    pdfFileObj.close()




    # reader = PdfReader("test5.pdf")
    # writer = PdfWriter()





    # add page 3 from reader, but crop it to half size:
    # page3 = reader.pages[0]


    # # crop page with cropbox
    # page3.cropbox.lower_left = (170, 467)
    # page3.cropbox.upper_left = (170,820)
    # page3.cropbox.lower_right = (425,467)
    # page3.cropbox.upper_right = (425,820)

    # print(page3)


    # writer.add_page(page3)

    # add some Javascript to launch the print window on opening this PDF.
    # the password dialog may prevent the print dialog from being shown,
    # comment the the encription lines, if that's the case, to try this out:

    writer.add_js("this.print({bUI:true,bSilent:false,bShrinkToFit:true});")

    # write to document-output.pdf
    os.remove("test121.pdf")

    with open("pypdf-output2.pdf", "wb") as out_f:
        writer.write(out_f)
    # print(send_file('pypdf-output2.pdf'))

    response = make_response('pypdf-output2.pdf')
    response.headers["Content-Type"] = "application/pdf"
    response.headers["Content-Disposition"] = "inline; filename=output.pdf"
    print(response.headers["Content-Type"])
    # return response
    return send_file('pypdf-output2.pdf')
    # return  file as a response

    # return send_from_directory("/","pypdf-output2.pdf",as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True)

