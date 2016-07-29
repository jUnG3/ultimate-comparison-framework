import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { TableData, TableDataSet, Type, LabelCls, Value, Data, Property, ListItem } from './../shared/index';
import { ComparisonConfigService } from './comparison-config.service';
import { ComparisonService } from './comparison.service';

@Injectable()
export class ComparisonDataService {
    private data: Array<Data> = new Array<Data>();
    
    constructor(
            private http: Http,
            private comparisonService: ComparisonService
        ){}
    
    public loadData(tableDataSet: TableDataSet){
        this.http.request('app/components/comparison/data/data.json')
        .subscribe(res => {
            res.json().forEach(obj => {
                let data: Data = new Data();
                data.tag = obj.tag;
                let regArray = /^((?:(?:\w+\s*)(?:-?\s*\w+.)*)+)\s*-?\s*((?:http|ftp|https)(?::\/\/)(?:[\w_-]+(?:(?:\.[\w_-]+)+))(?:[\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])?)$/gi.exec(data.tag);
                data.url = regArray ? regArray[2]: "";
                data.tag = regArray ? regArray[1]: data.tag;
                for(let key in obj){
                    if (!obj.hasOwnProperty(key)) continue;
                    switch(key){
                        case "tag":
                            break;
                        case "descr":
                            data.descr = obj[key];
                            break;
                        case "Description":
                            data.properties[key] = new Property(obj[key].plain);
                            break;
                        default:
                            let p:Property = new Property();
                            p.plain = obj[key].plain
                            if (tableDataSet.getTableData(key).type.tag == "text"){
                                p.text == obj[key].text
                            } else {
                                if(typeof obj[key].childs[0][0] != 'string'){
                                    obj[key].childs[0][0].forEach(item => {
                                        let content: string = item.content;
                                        let plainChilds: string = item.plainChilds;
                                        let itm: ListItem = new ListItem(content, plainChilds, this.comparisonService.converter);
                                        p.list.push(itm);
                                    });    
                                }
                            }
                            data.properties[key] = p;
                            break;
                    } 
                };
                this.data.push(data); 
            });
    });
}
}