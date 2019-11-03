// Copyright (c) 2019, MDBTraining and contributors
// For license information, please see license.txt
// ============
// @User12345
// @Admin12345

frappe.ui.form.on('Pengembalian', {
	// Validasi Tanggal Kembali -> Tidak Boleh Kurang Dari Tanggal Pinjam
	// Denda
	tanggal_kembali: function(frm) {
		if (frm.doc.tanggal_kembali < frm.doc.tanggal_pinjam) {
			frm.set_value('tanggal_kembali', '');
			frappe.throw(('Tanggal Kembali Tidak Boleh Kurang Dari Tanggal Peminjaman'));
		} else if (frm.doc.tanggal_kembali > frm.doc.estimasi_tanggal_kembali) {
			var tanggal_kembali = frm.doc.tanggal_kembali;
			var dt1 = new Date(tanggal_kembali);
			var dt2 = new Date(frm.doc.estimasi_tanggal_kembali);
			var Difference_In_Time = dt1.getTime() - dt2.getTime(); 
			var denda = Difference_In_Time / (1000 * 3600 * 24); 
			var hasil= denda*5000;
			frm.set_value('denda', hasil);
		}
	},

	id_pinjaman: function (frm) {
		frm.doc.data_pengembalian_buku = []
		if (frm.doc.id_pinjaman) {
			frappe.call({
				method: "frappe.client.get",
				args: {
					doctype: "Pinjaman",
					name: frm.doc.id_pinjaman
				},
				callback: function (r) {
					if (r.message) {
						for (var row in r.message.data_pinjaman_buku) {
							var child = frm.add_child("data_pengembalian_buku");
							frappe.model.set_value(child.doctype, child.name, "code_buku",
								r.message.data_pinjaman_buku[row].code_buku);
							frappe.model.set_value(child.doctype, child.name, "nama_buku",
								r.message.data_pinjaman_buku[row].nama_buku);
							frappe.model.set_value(child.doctype, child.name, "tipe_buku",
								r.message.data_pinjaman_buku[row].tipe_buku);
						}
					}
					frm.refresh_field('data_pengembalian_buku')
				}
			})	
		}
    }
});


cur_frm.set_query('id_pinjaman', function() {
	return{
		filters: [
			['Pinjaman', 'status', '=', 'On Borrow']
		]
	}
});
