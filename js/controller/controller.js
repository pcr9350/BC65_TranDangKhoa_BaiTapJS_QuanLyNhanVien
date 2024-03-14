function layThongTinTuForm() {
    var maNV = getEle('#idNhanVien').value;
    var tenNV = getEle('#tenNhanVien').value;
    var emailNV = getEle('#emailNhanVien').value;
    var matKhauNV = getEle('#matKhauNhanVien').value;
    var ngayLam = getEle('#datepicker').value;
    var luongCB = getEle('#luongCB').value;
    var chucVu = getEle('#chucVu').value;
    var gioLam = getEle('#gioLam').value;

    return new NhanVien(maNV, tenNV, emailNV, 
        matKhauNV, ngayLam, luongCB, chucVu, gioLam);
};

function renderDSNV(dsnv) {
    
    var contentHTML = "";
    for (var i = 0; i < dsnv.length; i++) {
        var nv = dsnv[i];
        var contentTr = `
        <tr>
        <td>${nv.idNV}</td>
        <td>${nv.tenNV}</td>
        <td>${nv.emailNV}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tinhTongLuong()}</td>
        <td>${nv.xepLoai()}</td>
        <td>
            <button class="btn btn-warning" onclick="suaNV('${nv.idNV}')" data-toggle="modal"
            data-target="#myModal">Sửa</button>
            <button class="btn btn-danger" onclick="xoaNV('${nv.idNV}')">Xóa</button>
        </td>
        </tr>
        `;
        contentHTML += contentTr;
    };
    getEle("#tableDanhSach").innerHTML = contentHTML;

};