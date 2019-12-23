
async function KFS() {
    if(tekrarLimit--<0) return
    
    let kalan= kaçKaldı(çözümKFS)
    let sonuç= await yineliEliminasyon(havuzKFS,çözümKFS)
    
    if (sonuç==kalan) {
        console.log("KFS: Çözdüm."); abort1=true;
    } else if (abort1) {
        return 1
    } else if (sonuç>=0) {
        let kondisyonel = true
        while (kondisyonel) {
            let [i, j, n] = enOlasıBul(havuzKFS)
            havuzKFS[i][j].splice(0,1)                             // havuzdan at
            yığıtKFS.push([kopi(çözümKFS), kopi(havuzKFS), kopi(mevcutTahminler)  ])      // yığıta yaz
            mevcutTahminler.push([i, j, n])
            çözümKFS[i][j]=n                                       // çözüme yaz
            kondisyonel = geçmişleYüzleşme(çözümKFS)
            if (!kondisyonel)
            havuzTemizle(havuzKFS, i, j, n)                        // havuzu ayarla
        }
        await sleep()
        KFS()
    } else if (sonuç==-1) {
        
        falsoTahminler.push(mevcutTahminler)
        try { [çözümKFS, havuzKFS, mevcutTahminler ] = yığıtKFS.pop() }
        catch (error) {console.error("Bozuk Sudoku !!")}
        await sleep()
        KFS()
    }
}

function geçmişleYüzleşme(çözüm) {  // geçmişte varsa TRUE
    for(let f of falsoTahminler) {
        let hepsivar = true
        for(let kutu of f) {
            if (çözüm[kutu[0]][kutu[1]]==kutu[2]) continue
            else hepsivar= false
        }
        if (hepsivar) console.log("Denenmiş olasılık bulundu.")
        if (hepsivar) return true
    }
    return false
}


function yıldırımHesapla (tahminlerim) {                // kökteki ihtimal sayılarını çarpar
    let çarpan = 1
    for (let t of tahminlerim) {
        çarpan *= yığıtKFS[0].havuz[t.i][t.j].length || 1
    }
    return çarpan
}


function patlatmaSinyali () {
    for(let y of yığıtKFS) {
        if (!y.length) continue
        for(let f of falsoTahminler) {
            let counter = false
            let farklıveSıfır= []       // bir eksikse havuzdan çıkar, tamsa patla
            // debugger
            for(let kutu of f) {
                if (y.çözüm[kutu.i][kutu.j]==kutu.n) continue
                else {
                    if (counter) {
                        farklıveSıfır = -1
                        break;
                    }
                    counter = true
                    if (!kutu.n) farklıveSıfır= kutu
                }
            }
            if (!counter) {  // sen de patla
                falsoTahminler.push(yığıtKFS[mev].tahminlerim)     // for..of iteratör kullandığımdan !     
                y= []
            } else if (farklıveSıfır.length) {   // sadece havuzdan çıkar
                let yeri = y.havuz[farklıveSıfır.i][farklıveSıfır.j].indexOf(farklıveSıfır.n)
                if (yeri !== -1) y.havuz[farklıveSıfır.i][farklıveSıfır.j].splice(yeri,1)
            }
        }
    }
}

function enYakınıBul () {
    let enminnakindeksi = 0
    for (let i=1; i< yığıtKFS.length; i++) {
        if (yığıtKFS[i].kutay === undefined ) continue
        if (yığıtKFS[i].kutay < yığıtKFS[enminnakindeksi].kutay )
        enminnakindeksi = i
    }
    return enminnakindeksi
}


function KenOlasıBul (hangıHavuz, öncekitahminler) { // 2 ve büyük, minimumu döner [i,j,4]
    let sıralama=[]
    for(let i=0; i<kaçlı*kaçlı; i++) {
        const olasılıkadedi = hangıHavuz[i%kaçlı][floor(i/kaçlı)].length
        if (olasılıkadedi)  sıralama.push([i,olasılıkadedi])
    }
    sıralama.sort((a,b)=> a[1]-b[1]);
    for (let s of sıralama) {
        if (öncekitahminler.indexOf(s[0])==-1) {   // daha önce denenmemişse ilk ihtimali al
            öncekitahminler.push(s[0])
            return [ s[0]%kaçlı, floor(s[0]/kaçlı) , hangıHavuz[s[0]%kaçlı][floor(s[0]/kaçlı)][0], s[1] ]
        } else {                                    // denenmişse kaçıncının kaldığını hesapla
            let kaçı = öncekitahminler.filter(ö => ö == s[0]).length
            if ( kaçı < s[1] ) {
                öncekitahminler.push(s[0])
                return [ s[0]%kaçlı, floor(s[0]/kaçlı) , hangıHavuz[s[0]%kaçlı][floor(s[0]/kaçlı)][0], s[1] ]
            }
        }
    }
}