
import SQLite from 'react-native-sqlite-storage';
import {Alert}  from 'react-native';
var db = SQLite.openDatabase({ name: "Glood.db" });

export function Add() {
    db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS student (id integer, log integer)');
        tx.executeSql('INSERT INTO student (id, log) VALUES (1, 1)');
        tx.executeSql('INSERT INTO student (id, log) VALUES (2, 2)');
        tx.executeSql('INSERT INTO student (id, log) VALUES (3, 3)');
        tx.executeSql('INSERT INTO student (id, log) VALUES (4, 4)');
        Select(tx);
    }, (e) => { console.log(e) });
}

export function Select(tx) {
    tx.executeSql('SELECT * FROM student', [], (tx, results) => {
        var len = results.rows.length, i;
        for (i = 0; i < len; i++) {
            console.log(results.rows.item(i).id + ':' + results.rows.item(i).log);
            Alert.alert(results.rows.item(i).id + ':' + results.rows.item(i).log);
        }
    }, null);
}
export function DeleteMin() {
    db.transaction((tx) => {
        tx.executeSql('DELETE FROM student WHERE id=(SELECT MIN(id) FROM student)', [], (tx, rs) => {
            console.log(rs.rows)
        });
        Select(tx);
    });
}
export function Drop() {
    db.transaction((tx) => {
        tx.executeSql('DROP TABLE student');
    });
}
export function Update() {
    db.transaction((tx) => {
        tx.executeSql('UPDATE student SET log=log+? WHERE id=8', [2], (tx, rs) => {
            if (rs.rowsAffected === 0) {
                tx.executeSql('INSERT INTO student (id, log) VALUES (?, ?)', [8, 8], (tx, rs) => {
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