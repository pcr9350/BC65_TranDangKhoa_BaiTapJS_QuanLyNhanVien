function NhanVien(_idNV, _tenNV, _emailNV, 
    _matKhauNV, _ngayLam, _luongCB, _chucVu, _gioLam) {
        this.idNV = _idNV;
        this.tenNV = _tenNV;
        this.emailNV = _emailNV;
        this.matKhauNV = _matKhauNV;
        this.ngayLam = _ngayLam;
        this.luongCB = _luongCB;
        this.chucVu = _chucVu;
        this.gioLam = _gioLam;

        this.tinhTongLuong = function() {
            var tongLuong = 0;
            if (this.chucVu === "Giám Đốc") {
                tongLuong = this.luongCB * 3;
            } else if (this.chucVu === "Trưởng Phòng") {
                tongLuong = this.luongCB * 2;
            } else if (this.chucVu === "Nhân Viên") {
                tongLuong = this.luongCB;
            };
            return tongLuong;
        };

        this.xepLoai = function() {
            var xepLoaiNV = "";
            if (this.gioLam >= 192) {
                xepLoaiNV = "Xuất Sắc";
            } else if (this.gioLam < 192 && this.gioLam >= 176) {
                xepLoaiNV = "Giỏi";
            } else if (this.gioLam < 176 && this.gioLam >= 160) {
                xepLoaiNV = "Khá";
            } else if (this.gioLam < 160) {
                xepLoaiNV = "Trung Bình";
            };
            return xepLoaiNV;
        };
}
