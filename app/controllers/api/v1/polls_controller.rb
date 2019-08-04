# frozen_string_literal: true

class Api::V1::PollsController < Api::BaseController
  include Authorization

  before_action -> { authorize_if_got_token! :read, :'read:statuses' }, only: :show
  before_action :set_poll

  respond_to :json

  def show
    render json: @poll, serializer: REST::PollSerializer, include_results: true
  end

  private

  def set_poll
    @poll = Poll.attached.find(params[:id])
    authorize @poll.status, :show?
  rescue Mastodon::NotPermittedError
    raise ActiveRecord::RecordNotFound
  end
end
