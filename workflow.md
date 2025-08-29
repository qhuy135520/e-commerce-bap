# 🛒 E-commerce Project

## 📌 Giới thiệu

Dự án E-commerce cho phép khách hàng mua sắm trực tuyến, quản lý sản phẩm, đơn hàng, giỏ hàng và thanh toán.  
Công nghệ sử dụng:

- Frontend: Vite + React
- Database: PostgreSQL using Supabase(support API Docs)
- Quản lý dự án: GitHub Agile Scrum (Issues, Milestones, Projects, Pull Requests)

---

## 🚀 Cách chạy dự án (cho Developer mới)

### 1. Clone source code

```bash
git clone https://github.com/qhuy135520/e-commerce-bap
cd e-commerce-bap
2. Cài đặt dependencies
bash
Copy code
npm install
3. Tạo file .env, được detail nội bộ

4. Chạy dự án
bash
Copy code
npm run dev
Mặc định frontend chạy tại:
👉 http://localhost:5173

📅 Quy trình Daily Scrum
Mỗi ngày team thực hiện Daily Scrum:

Tiến độ cập nhật trực tiếp trong GitHub Project Board:

To Do → In Progress → Review → Done

🔀 Quy tắc Git Workflow
1. Branch Naming
Tính năng mới: feature/<tên-tính-năng>
Ví dụ: feature/user-authentication

Fix bug: bugfix/<mã-bug>
Ví dụ: bugfix/login-500-error

Hotfix (fix khẩn cấp): hotfix/<mã-lỗi>
Ví dụ: hotfix/cart-price-error

2. Commit Message Format
less
Copy code
[yyyy-MM-dd][type]: [mô tả ngắn gọn]

Ví dụ:
2025-08-29-feat: thêm chức năng đăng ký tài khoản
2025-08-29-fix: sửa lỗi không load được giỏ hàng
2025-08-29-docs: cập nhật README
3. Pull Request (PR)
Tạo PR từ branch → develop

Yêu cầu Review chéo nhau bởi những thành viên còn lại, sau khi đã Done trong Kanban Board

Không được merge trực tiếp vào develop

📌 Luồng làm việc trong GitHub
Issues (Product Backlog)

Tạo issue cho mỗi task/bug/feature.

Gắn label: feature, bug, priority-high…

Milestones (Sprint Backlog)

Gom các issues vào milestone theo Sprint

Projects (Scrum Board)

Quản lý tiến độ qua board: To Do → In Progress -> Review → Done.

![Alt text](https://drive.google.com/file/d/1c4YV2vX0_bKkJNc-8KyOO9BG1z2iuUsm/view?usp=sharing)

Branches & Code

Tạo branch theo quy tắc.

Code xong → push → tạo Pull Request.

Review & Merge

Reviewer xem code → approve → merge vào develop.

Cuối sprint → merge develop

👨‍💻 Team Rules
Không commit trực tiếp vào hoặc develop.

Luôn tạo Pull Request và yêu cầu review.

Cập nhật tiến độ mỗi ngày trong board.

Luôn viết commit message rõ ràng, có ý nghĩa.

```
