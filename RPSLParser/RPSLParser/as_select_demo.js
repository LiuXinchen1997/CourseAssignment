'use strict';

const INF = 1 << 22;
let num = 4; // 自治系统的数量

class AS {
    constructor(as_num, as_name, mnt_by, descr, country, member_of) {
        this.as_num = as_num;
        this.as_name = as_name;
        this.mnt_by = mnt_by;
        this.descr = descr;
        this.country = country;
        this.member_of = member_of;
    }
}

class Policy {
    constructor(policy_id, as_num, as_num_d, is_import, permit, asregexp, comm, pref, med) {
        this.policy_id = policy_id;
        this.as_num = as_num;
        this.as_num_d = as_num_d;
        this.is_import = is_import;
        this.permit = permit;
        this.asregexp = asregexp;
        this.comm = comm;
        this.pref = pref;
        this.med = med;
    }
}

class Dist {
    constructor(comm, pref, med) {
        this.comm = comm;
        this.pref = pref;
        this.med = med;
    }
}

function getIndexOfAS(as_num, ases) {
    let index = -1;
    for (let i = 0; i < ases.length; i++) {
        if (ases[i].as_num === as_num) {
            index = i;
            break;
        }
    }

    return index;
}

class ASTableItem {
    constructor(as_num_dest, cost, next_as_num, path) {
        this.as_num_dest = as_num_dest;
        this.cost = cost;
        this.next_as_num = next_as_num;
        this.path = path;
    }
}

function calcCost(dist) {
    return dist.pref + Math.log(dist.med);
}




// 通过读取数据库获得自治系统
let ases = new Array();
for (let i = 0; i < num; i++) {
    ases.push(new AS('AS'+i, '', '', '', '', ''));
}

// 通过读取数据库获得连接关系
let policies = new Array();
policies.push(new Policy('', 'AS0', 'AS1', 0, 1, '', '', 20, 3));
policies.push(new Policy('', 'AS0', 'AS2', 1, 1, '', '', 10, 3));
policies.push(new Policy('', 'AS1', 'AS0', 0, 1, '', '', 10, 5));
policies.push(new Policy('', 'AS1', 'AS3', 1, 1, '', '', 10, 2));
policies.push(new Policy('', 'AS2', 'AS0', 1, 1, '', '', 20, 1));
policies.push(new Policy('', 'AS2', 'AS3', 0, 1, '', '', 20, 3));
policies.push(new Policy('', 'AS3', 'AS1', 1, 1, '', '', 30, 1));

// 建立拓扑关系
let rela = new Array();
for (let i = 0; i < num; i++) {
    rela.push(new Array());

    for (let j = 0; j < num; j++) {
        rela[i].push(new Dist('', INF, INF));
    }
}

for (let i = 0; i < policies.length; i++) {
    let start_i = getIndexOfAS(policies[i].as_num, ases);
    let end_i = getIndexOfAS(policies[i].as_num_d, ases);

    let is_import = policies[i].is_import;
    let med = policies[i].med;
    let pref = policies[i].pref;
    let comm = policies[i].comm;

    if (is_import === 1) {
        let tmp = start_i;
        start_i = end_i;
        end_i = tmp;
    }

    rela[start_i][end_i].med = med;
    rela[start_i][end_i].pref = pref;
    rela[start_i][end_i].comm = comm;
}

// console.log(rela);

let as_tables = new Array();
for (let i = 0; i < num; i++) {
    as_tables.push(new Array());

    for (let j = 0; j < num; j++) {
        as_tables[i].push(new ASTableItem(ases[j].as_num, INF, '', new Array()));
    }
}

// console.log(as_tables);

// 进行最短路径算法建立自治系统表
for (let i = 0; i < num; i++) {
    let cur_table = as_tables[i];

    let visited = new Array();
    let dists = new Array();
    let paths = new Array();
    for (let j = 0; j < num; j++) {
        visited.push(0);
        dists.push(INF);
        paths.push(new Array());
        paths[j].push(i);
    }

    dists[i] = 0;

    let u = -1;

    while (true) {
        let mincost = INF;
        for (let j = 0; j < num; j++) {
            if ((visited[j] != 1) && (dists[j] < mincost)) {
                mincost = dists[j];
                u = j;
            }
        }

        if (mincost === INF) { break; }

        visited[u] = 1;
        for (let v = 0; v < num; v++) {
            if (visited[v] != 1 && calcCost(rela[u][v]) < INF) {
                if (dists[u] + calcCost(rela[u][v]) < dists[v]) {
                    dists[v] = dists[u] + calcCost(rela[u][v]);
                    
                    paths[v] = new Array();
                    for (let p_i = 0; p_i < paths[u].length; p_i++) {
                        paths[v].push(paths[u][p_i]);
                    }
                    // paths[u];

                    paths[v].push(v);
                }
            }
        }
    }

    for (let j = 0; j < num; j++) {
        let index = getIndexOfAS(as_tables[i][j].as_num_dest, ases);
        as_tables[i][j].cost = dists[index];
        as_tables[i][j].path = paths[index];

        paths[index]
        if (paths[index].length > 1) {
            as_tables[i][j].next_as_num = ases[paths[index][1]].as_num;
        } else {
            as_tables[i][j].next_as_num = ases[paths[index][0]].as_num;
        }
    }
}

console.log(as_tables[0]);

let cur_as_num = 'AS0';
let last_as_num = 'AS3';

let first_index = getIndexOfAS(cur_as_num, ases);
let last_index = getIndexOfAS(last_as_num, ases);

let as_path = new Array();
as_path.push(cur_as_num);

while (cur_as_num != last_as_num) {
    let cur_index = getIndexOfAS(cur_as_num, ases);

    let cur_as_table = as_tables[cur_index];
    
    for (let i = 0; i < cur_as_table.length; i++) {
        if (cur_as_table[i].as_num_dest === last_as_num) {
            let next_as_num = cur_as_table[i].next_as_num;
            as_path.push(next_as_num);
            cur_as_num = next_as_num;
            break;
        }
    }
}

console.log('The path from '+cur_as_num+' to '+last_as_num+':', as_path);