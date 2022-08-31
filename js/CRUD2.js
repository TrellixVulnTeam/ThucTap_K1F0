let postsAPI = "http://localhost:3000/posts";

// START
function start() {
  getPosts(renderPosts);
  handleCreateForm();
}

start();

function getPosts(callback) {
  fetch(postsAPI)
    .then(function (reponse) {
      return reponse.json();
    })
    .then(callback);
}
// CREATE
function createPost(data, callback) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  };
  fetch(postsAPI, options)
    .then(function (response) {
      response.json();
    })
    .then(callback);
}
// DELETE
function handleDeletePost(id) {
  let options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  fetch(postsAPI + "/" + id, options)
    .then(function (response) {
      response.json();
    })
    .then(function () {
      // let dele = document.querySelecttor(".post-item-" + id);
      // if (dele) {
      //   dele.remove();
      // }
      getPosts(renderPosts);
    });
}

//RENDER
function renderPosts(posts) {
  localStorage.setItem("data", JSON.stringify(posts));
  // chuyển js sang json
  let listPost = document.querySelector("#list-posts");
  let htmls = posts.map(function (post) {
    console.log(post);
    return `
    <table class="table">
      <tr>
            <th class="col-1">${post.id}</th>
            <td class="col-4">${post.title}</td>
            <td class="col-4"> ${post.author}</td>
            <td class="">
              <button type="button" class="btn btn-primary " onClick="handleDeletePost(${post.id})">Xóa</button>
              <button type="button" class="btn btn-secondary" onClick="inputFix(${post.id})" onchange="handleFixPost(data,${post.id})">Sửa</button>
              <button type="button" class="btn btn-info" onClick="">Xem chi tiết</button>
            </td>
      </tr>
    </table>
    `;
  });
  let titleTB = `
  <table class="table">
        <tr>
          <th class="col-1">ID</th>
          <th class="col-4">Title</th>
          <th class="col-4">Author</th>
          <th scclassope="">Chức năng</th>
        </tr>
    </table>`;
  let html = htmls.join("");
  // document.getElementById("demo").innerHTML = titleTB + html;
  listPost.innerHTML = titleTB + html;
  // listPost.innerHTML = html;
}

// SỬ LÝ CREATE
function handleCreateForm() {
  let createBtn = document.querySelector("#create");
  createBtn.onclick = function () {
    // TẠO GIÁ TRỊ TRONG INPUT
    let title = document.querySelector('input[name="title"]').value;
    let author = document.querySelector('input[name="author"]').value;
    // TẠO ĐỐI TƯỢNG
    let formData = {
      title: title,
      author: author,
    };
    // GỌI HÀM TẠO
    createPost(formData, function () {
      getPosts(renderPosts);
    });
    // alert(title);
  };
}

function handleFixPost(data, id) {
  let options1 = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;  charset=UTF-8",
    },
    body: JSON.stringify(data),
  };
  fetch(postsAPI + "/" + id, options1)
    .then(function (response) {
      response.json();
    })
    .then(function () {
      getPosts(renderPosts);
    })
    .catch(function () {
      console.log("lỗi");
    });
}

function inputFix(post) {
  let listData = JSON.parse(localStorage.getItem("data"));
  // let currentData = listData.find(function(item) {item.id === post});
  let currentData = listData.find((item) => item.id === post);
  let iFix = document.querySelector("#save");
  let title = document.getElementById("title");
  let author = document.getElementById("author");

  title.value = currentData.title;
  author.value = currentData.author;

  iFix.onclick = function () {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let dataForm1 = {
      title: title,
      author: author,
    };
    handleFixPost(dataForm1, post);
  };
}
