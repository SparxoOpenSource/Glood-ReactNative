
import SQLite from 'react-native-sqlite-storage';
import {Alert}  from 'react-native';
import {EventListener} from "../listener/EventListener";
var db = SQLite.openDatabase({ name: "Glood.db" });
var item = [];
/**
 * 查询数据是否存在
 */
export function TabbleIsExist(tableName) {
    db.transaction((tx) => {
        var sql = "select count(*) as c from Sqlite_master where type ='table' and name =? ";
        tx.executeSql(sql, [tableName], (tx, rs) => {
            var count = rs.rows.item.length;
            if (count == 0) {
                CreatTable();
            }
        });
    }, (e) => { console.log(e) });
}
/**
 * 创建数据表
 */
export function CreatTable() {
    db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS GloodRecord (RoomName varchar(100), FileName varchar(100), Time double, UserName varchar(100))');
    }, (e) => { console.log(e) });
}
/**
 * 新增数据
 */
export function Add(roomName, fileName, time, userName) {
    db.transaction((tx) => {
        var sql = "INSERT INTO GloodRecord (RoomName, FileName ,Time ,UserName) VALUES (?,?,?,?)";
        tx.executeSql(sql, [roomName, fileName, time, userName], (tx, rs) => {
            //插入数据成功，受影响的行数
            console.log("插入数据成功，受影响的行数" + rs.rows.item.length);
        });
        // Select(tx);
    }, (e) => { console.log(e) });
}

/**
 * 根据房间查询该房间下的所有数据
 */
export function SelectByRoomName(value) {
    db.transaction((tx) => {
        var sql = "SELECT * FROM GloodRecord WHERE RoomName=?";
        tx.executeSql(sql, [value], (tx, results) => {
            var len = results.rows.length, i;
            item = [];
            for (i = 0; i < len; i++) {
                var value = {
                    RoomName: results.rows.item(i).RoomName,
                    FileName: results.rows.item(i).FileName,
                    Time: results.rows.item(i).Time,
                    name: results.rows.item(i).FileName,
                    ip: results.rows.item(i).UserName,
                    time: results.rows.item(i).Time
                };
                item = [...item, value];
            }
            if (item.length > 0) {
                EventListener.trigger("SelectByRoomName", item);
            }
        }, null);
    }, (e) => {
        console.log(e);
    });
}
export function SelectAll() {
    db.transaction((tx) => {
        tx.executeSql('SELECT * FROM GloodRecord', [], (tx, results) => {
            var len = results.rows.length, i;
            item = [];
            for (i = 0; i < len; i++) {
                var value = {
                    RoomName: results.rows.item(i).RoomName,
                    FileName: results.rows.item(i).FileName,
                    Time: results.rows.item(i).Time,
                    name: results.rows.item(i).FileName,
                    ip: results.rows.item(i).UserName,
                    time: results.rows.item(i).Time
                };
                item = [...item, value];
            }
            console.log(item);
            if (item.length > 0) {
                EventListener.trigger("SelectByRoomName", item);
            }
        }, null);
    }, (e) => {
        console.log(e);
    });
}
/**
 * 根据录音文件名删除数据
 */
export function DeleteMin(fileName) {
    db.transaction((tx) => {
        tx.executeSql('DELETE FROM GloodRecord WHERE FileName=? FROM GloodRecord)', [fileName], (tx, rs) => {
            console.log(rs.rows)
        });
        Select(tx);
    });
}
export function Drop() {
    db.transaction((tx) => {
        tx.executeSql('DROP TABLE GloodRecord');
    });
}
export function Update(roomName, fileName, time, userName) {
    db.transaction((tx) => {
        tx.executeSql('UPDATE GloodRecord SET RoomName=?,Time=? WHERE FileName=?', [roomName,time,fileName], (tx, rs) => {
            if (rs.rowsAffected === 0) {
                tx.executeSql('INSERT INTO GloodRecord (RoomName, FileName ,Time ,UserName) VALUES (?,?,?,?)', [roomName, fileName, time, userName], (tx, rs) => {
                    Select(tx);
                });
            } else {
                Select(tx);
            }
        });
    }, (a) => { console.log(a) });
}

export function DoTest() {
    db.transaction((tx) => {
        tx.executeSql('DROP TABLE IF EXISTS test_table');
        tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

        // demonstrate PRAGMA:
        db.executeSql("pragma table_info (test_table);", [], (res) => {
            console.log("PRAGMA res: " + JSON.stringify(res));
        });

        tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], (tx, res) => {
            console.log("insertId: " + res.insertId + " -- probably 1");
            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

            db.transaction((tx) => {
                tx.executeSql("select count(id) as cnt from test_table;", [], (tx, res) => {
                    console.log("res.rows.length: " + res.rows.length + " -- should be 1");
                    console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
                });
            });

        }, (e) => {
            console.log("ERROR: " + e.message);
        });
    });
}