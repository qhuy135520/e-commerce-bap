# 📘 Coding Insight / Rules

## 1. Thư viện & cấu trúc

- Mỗi dự án chỉ sử dụng **1 UI library**(Antd), **1 icon set**(react-icons), **1 form
  library** (Yup), **1 middleware API**.\
- Import theo absolute path (`@/...`).\
- Tách các import cùng folder → tạo file `index.js` để export chung.

## 2. Component & Styled

- Mỗi component hoặc block có 1 file styled riêng.\
- Không bọc styled rồi đặt class nữa.\
- Không dùng **inline style** hoặc **inline function**.\
- File UI component: `<Name>.component.jsx`.\
- File styled: `<Name>.styled.jsx`.\
- Toàn bộ sử dụng camelCase, trừ components
- Tách các import cùng folder → tạo file `index.js` để export chung.

## 3. Logic & Code style

- Biểu thức `?:` → đưa ra biến riêng.\
- Mỗi block code cách 1 dòng trắng.\
- Xóa toàn bộ `debugger`, `console.log` trước khi push code.

---

# 📘 Naming Conventions

- **camelCase** → toàn bộ trừ Components.\
- **UPPER_CASE** → constants.\

---

# 📘 Coding Conventions

- **unit** -> px

# 📘 Git Workflow

- Nhánh:

  - `feature/...` → thêm tính năng.\
  - `bugfix/...` → fix bug.\
  - `hotfix/...` → sửa gấp.

- Commit message: `YYYY-MM-DD-Feature-Name`, `YYYY-MM-DD-Fix-Name`\
  Ví dụ:

      2025-09-02-feat: Add Login feature
      2025-09-02-fix: fix Login feature

- Mỗi PR:

  - Trước khi push fetch origin trước rồi rebase, tuyệt đối không pull origin develop để fix conflict
  - **Chỉ có 1 commit**.\
  - Không quá **20 file thay đổi** (kể cả images/icons).

- Tách PR từ nhiều commit (vd PR có 4 commit):

  ```bash
  git log --oneline
  # Ví dụ:
  # a1b2c3d4 Commit 1: add header
  # b2c3d4e5 Commit 2: fix bug login
  # c3d4e5f6 Commit 3: update UI
  # d4e5f6g7 Commit 4: add tests

  git checkout -b PR_1
  git cherry-pick a1b2c3d4
  git push origin PR_1
  ```

  → Tương tự với commit 2, 3, 4.

- Trường hợp đặc biệt:

  - Quá nhiều ảnh → checkout riêng 1 nhánh chỉ để đẩy ảnh.\
  - 2 người cùng cần 1 thư viện → tạo PR riêng để install thư viện
    trước.

---

# 📘 Database (Supabase)

- File API: `api<Name>.js` (vd: `apiProduct.js`, `apiCategory.js`).\
- File slice: `<Name>slice.js` (vd: `productSlice.js`,)
