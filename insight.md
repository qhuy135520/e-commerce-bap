# Coding Insight / Rules

## Naming conventions

- Sử dụng **camelCase** cho biến, hàm
- Tên các file component UI : **<Name>.component.jsx**
- File css của các component UI: **<Name>.styled.jsx**
- File common đặt tên theo kiểu **PascalCase**
- Sử dụng **UPPER_CASE** cho constants.
- Folder chứa component trùng với tên page => Viết hoa đầu

## Git

- **Xóa debugger, console.log trước khi push code**
- Tạo nhánh theo format: `feature/...`, `fix/...`, `hotfix/...`.
- Commit message rõ ràng, ngắn gọn: `2025-09-02-Feature-Login` , `2025-09-02-Fix-Header`


## DB
-- Tương tác với supabase => tạo file **api<Name>.js** ví dụ: apiProduct, apiCategory,...
-- Với các file slice tương tự: **slice<Name>.js**  ví dụ: sliceProduct, sliceUser,...


