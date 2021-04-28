const TaiKhoan = require('../Models/TaiKhoan');
const KhachHang = require('../Models/KhachHang');
const DoanhNghiep = require('../Models/DoanhNghiep');
const { createToken, verifyToken } = require('./index');
class MeController {
    //get me/information / get || post put delete
    async information(req, res, next) {
        const token = req.get('Authorization').replace('Bearer ', '');
        const _id = await verifyToken(token);
        var result = await TaiKhoan.findOne({ _id }); //muc dich la lay role
        if (result != null) {
            const roleDT = result.Role;
            if (roleDT == "KHACHHANG") {
                var resultKH = await KhachHang.findOne({ id_account: _id });
                res.status(200).send({
                    "data": resultKH,
                    "error": "null",
                });
            }
            else {
                var resultDN = await DoanhNghiep.findOne({ id_account: _id });
                res.status(200).send({
                    "data": resultDN,
                    "error": "null",
                });
            }
        } else {
            res.status(404).send({
                "data": '',
                "error": "Not found user!",
            });
        }
    }

    async editProfile(req, res, next) {
        const { Ten, SoDienThoai, DiaChi } = req.body;
        var updateValue = {SoDienThoai, DiaChi};
        const token = req.get('Authorization').replace('Bearer ', '');
        const _id = await verifyToken(token);
        var result = await TaiKhoan.findOne({ _id }); //muc dich la lay role
        if (result != null) {
            const roleDT = result.Role;
            if (roleDT == "KHACHHANG") {
                updateValue.TenKhachHang = Ten;
                var resultKH = await KhachHang.findOneAndUpdate({ id_account: _id }, 
                    updateValue, {
                    new: true
                });
                res.status(200).send({
                    "data": resultKH,
                    "error": "null",
                });
            }
            else {
                updateValue.TenDoanhNghiep = Ten;
                var resultDN = await DoanhNghiep.findOneAndUpdate({ id_account: _id }, 
                    updateValue, {
                    new: true
                });
                res.status(200).send({
                    "data": resultDN,
                    "error": "null",
                });
            }
        } else {
            res.status(404).send({
                "data": '',
                "error": "Not found user!",
            });
        }
    }
}

module.exports = new MeController();