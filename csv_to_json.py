import csv
import json


csvfile = open('meteo.csv', 'r')
jsonfile = open('meteo.json', 'w')

reader = csv.DictReader( csvfile)
pydicto = []
for row in reader:
    print(row)
    # json.dump(row, jsonfile)
    # jsonfile.write('\n')
    # pydicto.append({"ENTRY": {"year":row[0], "month":row[1], "day":row[2], "temp":row[3]}})
    pydicto.append(dict(row))
    # print(row)
# first is header
pydicto = pydicto[1::]
# make into actual json format
pydicto = {"DATA": pydicto}

json.dump(pydicto, jsonfile)
