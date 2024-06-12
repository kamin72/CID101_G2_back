<template class="d-flex justify-content-end align-items-end">
    <div style="padding-top: 50px; width: 85%" class="container">
        <h1>課程管理</h1>
        <div class="button-wrap d-flex">
            <div style="width: 30%;" class="left-wrap d-flex justify-content-between">
                <button type="button" class="btn btn-primary">課程內容管理</button>
                <button type="button" class="btn btn-secondary">課程訂單管理</button>
            </div>
            <div class="right-wrap">
                <div style="width: 30%;" class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="請輸入課程內容資訊" aria-label="search-course-info"
                        aria-describedby="button-search" />
                    <button class="btn btn-primary" type="button" id="button-search">搜尋</button>
                </div>
                <button type="button" class="btn btn-primary">新增</button>

            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
