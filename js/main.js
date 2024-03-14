var DSNV = [];

// Khi user load trang => lấy dữ liệu từ localStorage để hiển thị lên giao diện 
var jsonData = localStorage.getItem('DSNV_LOCAL');
if (jsonData !== null) {
    // convert json về Array 
    jsonData = JSON.parse(jsonData);
   
    DSNV = jsonData.map(function (item) {
        return new NhanVien(
            item.idNV,
            item.tenNV,
            item.emailNV,
            item.matKhauNV,
            item.ngayLam,
            item.luongCB,
            item.chucVu,
            item.gioLam
        );
    });
    // render DSSV ra giao diện 
    renderDSNV(DSNV);
};

//clear form
function resetForm() {
    getEle('#formQLNV').reset();
    getEle('#idNhanVien').readOnly = false;
};
function themNV() {
    var nv = layThongTinTuForm();

    //kiểm tra mã Nhân Viên
    var isValid = kiemTraRong(nv.idNV, "#tbTKNV", "Mã nhân viên không được để trống và chỉ được nhập số")
    && kiemTraSo(nv.idNV, "#tbTKNV", "Mã nhân viên chỉ được nhập số") 
    && kiemTraTrung(nv.idNV, DSNV, "#tbTKNV", "Mã nhân viên đã tồn tại")
    && kiemTraDoDai(nv.idNV, "#tbTKNV", 4, 6, "Mã nhân viên phải có từ 4 đến 6 kí số");

    //kiểm tra tên Nhân Viên
    isValid &= kiemTraRong(nv.tenNV, "#tbTen", 
    "Tên Nhân Viên không được để trống")
    && kiemTraChuoi(nv.tenNV, "#tbTen", 
    "Tên Nhân Viên không được nhập số");

    // kiểm tra Email 
    isValid &= kiemTraRong(nv.emailNV, "#tbEmail", "Email không được để trống")
    && kiemTraEmail(nv.emailNV, "#tbEmail", "Email không đúng định dạng ...@...");

    //kiểm tra mật khẩu
    isValid &= kiemTraRong(nv.matKhauNV, "#tbMatKhau", "Mật khẩu không được để trống")
    && kiemTraMatKhau(nv.matKhauNV, "#tbMatKhau", "Mật khẩu phải có ít nhứt 1 chữ in hoa, một chữ số, một kí tự đặc biệt và từ 6 đến 10 kí tự");

    //kiểm tra ngày làm
    isValid &= kiemTraRong(nv.ngayLam, "#tbNgay", "Ngày làm không được để trống")
    && kiemTraNgayLam(nv.ngayLam, "#tbNgay", "Ngày làm phải đúng định đạng mm/dd/yyyy");

    //kiểm tra lương cơ bản
    isValid &= kiemTraRong(nv.luongCB, "#tbLuongCB", "Lương cơ bản không được để trống")
    && kiemTraSo(nv.luongCB, "#tbLuongCB", "Lương cơ bản không được nhập chữ")
    && kiemTraTrongKhoang(nv.luongCB, "#tbLuongCB", 1000000, 20000000, "Lương cơ bản trong khoảng 1.000.000 đến 20.000.000");

    //kiểm tra chức vụ
    isValid &= kiemTraRong(nv.chucVu, "#tbChucVu", "Chức vụ không được để trống");

    //kiểm tra số giờ làm trong tháng
    isValid &= kiemTraRong(nv.gioLam, "#tbGiolam", "Giờ làm trong tháng không được để trống")
    && kiemTraSo(nv.gioLam, "#tbGiolam", "Giờ làm trong tháng không được nhập chữ")
    && kiemTraTrongKhoang(nv.gioLam, "#tbGiolam", 80, 200, "Giờ làm trong tháng trong khoảng 80-200 giờ");

    //kiểm tra isValid: nếu true mới thêm NV
    if (isValid) {
        DSNV.push(nv);
        // save data xuống localStorage 
        saveLocalStorage(DSNV);
        // render DSNV ra giao diện 
        renderDSNV(DSNV);
        // clear form 
        resetForm();
    }
}

function xoaNV(idNV) {
    var viTri = -1;
    for (var i = 0; i < DSNV.length; i++) {
        if (DSNV[i].idNV === idNV) {
            viTri = i;
        }
    };
    // Nếu tìm thấy vị trí thì xóa
    if (viTri !== -1) {
        DSNV.splice(viTri, 1);
        // save data xuống localStorage 
        saveLocalStorage(DSNV);
        // render DSSV ra giao diện 
        renderDSNV(DSNV);
    };
};

function suaNV(idNV) {
    //clear form
    resetForm();
    var viTri = DSNV.findIndex(function(item) {
        return item.idNV === idNV;
    })

    //lấy ra nv tại vị trí index theo idNV
    var nv = DSNV[viTri];

    //disable edit input idNV
    getEle('#idNhanVien').readOnly = true;
    //show thông tin lên form
    getEle('#idNhanVien').value = nv.idNV;
    getEle('#tenNhanVien').value = nv.tenNV;
    getEle('#emailNhanVien').value = nv.emailNV;
    getEle('#matKhauNhanVien').value = nv.matKhauNV;
    getEle('#datepicker').value = nv.ngayLam;
    getEle('#luongCB').value = nv.luongCB;
    getEle('#chucVu').value = nv.chucVu;
    getEle('#gioLam').value = nv.gioLam;
};

function updateNV() {
    //lấy thông tin đã update
    var nv = layThongTinTuForm();

    //kiểm tra tên Nhân Viên
    var isValid = kiemTraRong(nv.tenNV, "#tbTen", 
    "Tên Nhân Viên không được để trống")
    && kiemTraChuoi(nv.tenNV, "#tbTen", 
    "Tên Nhân Viên không được nhập số");

    // kiểm tra Email 
    isValid &= kiemTraRong(nv.emailNV, "#tbEmail", "Email không được để trống")
    && kiemTraEmail(nv.emailNV, "#tbEmail", "Email không đúng định dạng ...@...");

    //kiểm tra mật khẩu
    isValid &= kiemTraRong(nv.matKhauNV, "#tbMatKhau", "Mật khẩu không được để trống")
    && kiemTraMatKhau(nv.matKhauNV, "#tbMatKhau", "Mật khẩu phải có ít nhứt 1 chữ in hoa, một chữ số, một kí tự đặc biệt và từ 6 đến 10 kí tự");

    //kiểm tra ngày làm
    isValid &= kiemTraRong(nv.ngayLam, "#tbNgay", "Ngày làm không được để trống")
    && kiemTraNgayLam(nv.ngayLam, "#tbNgay", "Ngày làm phải đúng định đạng mm/dd/yyyy");

    //kiểm tra lương cơ bản
    isValid &= kiemTraRong(nv.luongCB, "#tbLuongCB", "Lương cơ bản không được để trống")
    && kiemTraSo(nv.luongCB, "#tbLuongCB", "Lương cơ bản không được nhập chữ")
    && kiemTraTrongKhoang(nv.luongCB, "#tbLuongCB", 1000000, 20000000, "Lương cơ bản trong khoảng 1.000.000 đến 20.000.000");

    //kiểm tra chức vụ
    isValid &= kiemTraRong(nv.chucVu, "#tbChucVu", "Chức vụ không được để trống");

    //kiểm tra số giờ làm trong tháng
    isValid &= kiemTraRong(nv.gioLam, "#tbGiolam", "Giờ làm trong tháng không được để trống")
    && kiemTraSo(nv.gioLam, "#tbGiolam", "Giờ làm trong tháng không được nhập chữ")
    && kiemTraTrongKhoang(nv.gioLam, "#tbGiolam", 80, 200, "Giờ làm trong tháng trong khoảng 80-200 giờ");

    // kiểm tra isValid: nếu true mới update 
    if(isValid) {
    // tìm vị trí của phần tử được cập nhật trong mảng
    var viTri = DSNV.findIndex(function(item) {
        return item.idNV === nv.idNV;
    });

    DSNV[viTri] = nv;
    // save data xuống localStorage 
    saveLocalStorage(DSNV);
    // render DSSV ra giao diện 
    renderDSNV(DSNV);

    // enable edit input idNV 
    getEle('#idNhanVien').readOnly = false;
    // clear form 
    resetForm();
    }; 
};

// tìm kiếm theo tên 
// B1: lấy được textSearch
// B2: duyệt mảng để tìm ra phần tử có textSearch
// B3: hiển thị ra màn hình
// + Đã có function renderDSNV(param);
// + tạo 1 biến để chứa kết quả tìm được 
getEle("#btnTimNV").onclick = function() {
    // var textSearch = getEle("#searchName").value.trim()?.toLowerCase();
    var textSearch = getEle("#searchName").value;
    var resultSearch = [];

    if (textSearch !== "") {
        resultSearch = DSNV.filter(function(nv) {
            // return nv.tenNV.toLowerCase().includes(textSearch);
            return nv.xepLoai().includes(textSearch);
        });
        renderDSNV(resultSearch);
    } else {
        renderDSNV(DSNV);
    };
};