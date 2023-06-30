<TableContainer
                  sx={{ maxHeight: 400, borderRadius: "20px" }}
                  className="scroll"
                >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Picture</TableCell>
                        <TableCell>Deal Name</TableCell>
                      </TableRow>
                    </TableHead>
                    {deals ? (
                      <TableBody>
                        {deals?.data?.map((deal: InventoryI, index: number) => (
                          <TableRow>
                            <TableCell>
                              <div>
                                <input
                                  className="checkbox"
                                  type="checkbox"
                                  value={deal.id}
                                  checked={chkDeal.includes(deal.id)}
                                  onChange={() => onCheckDeal(deal)}
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              {deal.content?.images != null ? (
                                <CardMedia
                                  sx={{
                                    height: "25",
                                    objectFit: "contain",
                                    padding: 7,
                                  }}
                                  image={deal.content.images[0]}
                                  title="green iguana"
                                />
                              ) : (
                                <CardMedia
                                  sx={{
                                    height: 25,
                                    backgroundColor: "#e4e2e2",
                                    objectFit: "contain",
                                    padding: 5,
                                  }}
                                  image={""}
                                  title="image"
                                />
                              )}
                            </TableCell>
                            <TableCell>{deal.content?.label}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    ) : null}
                  </Table>
                </TableContainer>





