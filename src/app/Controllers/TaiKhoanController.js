const TaiKhoan = require('../Models/TaiKhoan');
const KhachHang = require('../Models/KhachHang');
const DoanhNghiep = require('../Models/DoanhNghiep');
const bcrypt = require('bcrypt');
const { createToken } = require('./index');

class TaiKhoanController {
    //Post auth/login
    async login(req, res, next) {
        const { Email, Password } = req.body;
        var result = await TaiKhoan.findOne({ Email })
        if (result != null) {
            const isEqualPassword = await bcrypt.compare(Password, result.Password);
            if (isEqualPassword) {
                const token = await createToken(`${result._id}`);
                res.status(200).send({
                    "data": result,
                    "token": token,
                    "error": "null",
                });
            }
            else {
                res.status(400).send({
                    'error': 'Wrong password!',
                });
            }
        } else {
            res.status(404).send({
                'error': 'Email not found!',
            });
        }
    }
    //Post customers/register-khachhang
    async registerKhachHang(req, res, next) {

        const { Email, Password, TenKhachHang, SoDienThoai, DiaChi } = req.body;
        const Role = 'KHACHHANG';
        try {
            const result = await TaiKhoan.findOne({ Email });
            if (result == null) {
                const hashPassword = await bcrypt.hash(Password, 5);
                const account = await TaiKhoan.create({ Email, Password: hashPassword, Role });
                const id_account = account._id;
                const customer = await KhachHang.create({ TenKhachHang, Email, SoDienThoai, DiaChi, id_account });
                console.log(customer);
                res.status(200).send(customer);
            } else {
                res.status(400).send({
                    'error': 'Dang ky that bai',
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).send({
                'error': 'Dang ky that bai',
            });
        }
    }
    //Post enterprises/register-doanhnghiep
    async registerDoanhNghiep(req, res, next) {

        const { Email, Password, TenDoanhNghiep, SoDienThoai, DiaChi, GiayPhep } = req.body;
        const Role = 'DOANHNGHIEP';
        try {
            const result = await TaiKhoan.findOne({ Email });
            if (result == null) {
                const hashPassword = await bcrypt.hash(Password, 5);
                const account = await TaiKhoan.create({ Email, Password: hashPassword, Role });
                const id_account = account._id;
                const customer = await DoanhNghiep.create({ TenDoanhNghiep, Email, SoDienThoai, DiaChi, id_account, GiayPhep, TrangThai: "INACTIVE" });
                res.status(200).send(customer);
            } else {
                res.status(400).send({
                    'error': 'Dang ky that bai',
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(400).send({
                'error': 'Dang ky that bai',
            });
        }
    }
}

module.exports = new TaiKhoanController();