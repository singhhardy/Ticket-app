import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice';
import BackButton from '../components/BackButton';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getNotes, createNote, reset as notesReset } from '../features/notes/noteSlice';
import NoteItem from '../components/NoteItem';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';

const customStyles ={
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  }
}

Modal.setAppElement('#root')

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const { ticket, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets);
  const { notes, isLoading: notesIsLoading } = useSelector((state) => state.notes);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [dispatch, isError, message, ticketId]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed');
    navigate('/tickets');
  };

  // Create Note submit

  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({noteText, ticketId}))
    closeModal()
  }

  // Open/close modal

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>{ticket.status}</span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button onClick={openModal} className="btn"><FaPlus /> Add Note</button>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add note'>
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>x</button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea name='noteText' id='noteText' className='form-control' placeholder='Note text' value={noteText}
            onChange={(e) => setNoteText(e.target.value)}></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>Submit</button>
          </div>
        </form>
      </Modal>

      {notes && notes.length > 0 ? (
        notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))
      ) : (
        <p>No notes available for this ticket.</p>
      )}

      {ticket.status !== 'closed' && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
